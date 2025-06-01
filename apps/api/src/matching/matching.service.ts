import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { MatchMethod, Post } from "@prisma/client"
import { OpenAI } from "openai"
import { envConfig } from "src/dynamic-modules"

@Injectable()
export class MatchingService {
    private openai: OpenAI

    constructor(
    private prisma: PrismaService,
    ) {
        this.openai = new OpenAI({
            apiKey: envConfig().openai.apiKey,
        })
    }

    async cleanExistingMatches(postId: string) {
        await this.prisma.matchingSuggestion.deleteMany({
            where: {
                OR: [
                    { sourcePostId: postId, method: { in: [MatchMethod.GPT, MatchMethod.EMBEDDING] } },
                    { targetPostId: postId, method: { in: [MatchMethod.GPT, MatchMethod.EMBEDDING] } },
                ],
            },
        })
    }

    async generateMatches(post: Post & { tags?: { name: string }[] }) {
        // Get 10 potential posts (can adjust filter logic as needed)
        const otherPosts = await this.prisma.post.findMany({
            where: {
                id: { not: post.id },
                status: "ACTIVE",
                userId: { not: post.userId },
            },
            include: {
                user: true,
                tags: true,
            },
            take: 10,
        })

        if (otherPosts.length === 0) return []

        // Build batch prompt
        const prompt = `You are a skill matching system. Below is 1 source post and 10 target posts. For each target post, analyze the compatibility with the source post and rate it from 0 to 1 (where 1 is a perfect match). Consider the following factors:
1. Direct skill match: How well do the skills they have match what the other wants to learn?
2. If their skill is a job (e.g., Developer), they can perform related tasks (e.g., web design, app design) for all professions.
3. Tag compatibility: How well do the tags of the posts align with each other?

Return ONLY a JSON array in the following format:
[
  {"targetPostId": "id1", "score": 0.8},
  {"targetPostId": "id2", "score": 0.6},
  ...
]

Source Post:
- Has skill: "${post.haveSkill}"
- Wants to learn: "${post.wantSkill}"
- Description: "${post.description || "No description provided"}"
- Tags: ${post.tags?.map((tag: { name: string }) => tag.name).join(", ") || "None"}

${otherPosts.map((p, i) => `Target Post ${i+1}:
- ID: "${p.id}"
- Has skill: "${p.haveSkill}"
- Wants to learn: "${p.wantSkill}"
- Description: "${p.description || "No description provided"}"
- Tags: ${p.tags?.map((tag: { name: string }) => tag.name).join(", ") || "None"}
`).join("\n")}

Return ONLY the JSON array as shown above.`

        const response = await this.openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: prompt,
            max_tokens: 500,
            temperature: 0.3,
        })

        const answer = response.choices[0].text?.trim()

        console.log(answer + "\n\n")
        if (!answer) return []

        let scores: { targetPostId: string, score: number }[] = []
        try {
            // Tìm đoạn JSON trong câu trả lời
            const jsonMatch = answer.match(/\[.*\]/s)
            if (jsonMatch) {
                scores = JSON.parse(jsonMatch[0])
            } else {
                scores = JSON.parse(answer)
            }
        } catch {
            console.error("Could not parse AI batch match result:", answer)
            return []
        }

        // Lọc các match có score > 0.5
        const validMatches = scores.filter(m => typeof m.score === "number" && m.score > 0.5)
        // Sắp xếp và lấy top 3
        const topMatches = validMatches.sort((a, b) => b.score - a.score).slice(0, 3)

        // Tạo dữ liệu để lưu vào DB
        const matchData = topMatches.map(m => ({
            sourcePostId: post.id,
            targetPostId: m.targetPostId,
            method: MatchMethod.GPT,
            score: m.score,
        }))

        if (matchData.length > 0) {
            await this.prisma.matchingSuggestion.createMany({
                data: matchData,
            })
        }

        return matchData
    }
} 
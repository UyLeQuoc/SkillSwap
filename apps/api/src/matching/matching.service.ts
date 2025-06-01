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

    private async checkMatch(post1: Post, post2: Post): Promise<number | null> {
        try {
            const prompt = `Analyze these two skill swap posts and rate their compatibility on a scale of 0 to 1 (where 1 is perfect match):

Post 1:
- Has skill: "${post1.haveSkill}"
- Wants to learn: "${post1.wantSkill}"
- Description: "${post1.description || "No description provided"}"

Post 2:
- Has skill: "${post2.haveSkill}"
- Wants to learn: "${post2.wantSkill}"
- Description: "${post2.description || "No description provided"}"

Consider the following factors:
1. Direct skill match: How well do the skills they have match what the other wants to learn?
2. Skill level compatibility: Are the skills at similar levels of expertise?
3. Learning potential: How well can each person teach their skill to the other?
4. Interest alignment: How interested would each person be in learning the other's skill?

IMPORTANT: Respond with ONLY the score number between 0 and 1 (e.g., 0.85). Do not include any other text or explanation.`

            const response = await this.openai.completions.create({
                model: "gpt-3.5-turbo-instruct",
                prompt: prompt,
                max_tokens: 10,
                temperature: 0.3,
            })

            const answer = response.choices[0].text?.toLowerCase().trim()
            console.log("answer", answer)
            if (!answer) return null

            // Extract score from response - now just looking for a number
            const scoreMatch = answer.match(/([0-9]*[.]?[0-9]+)/)
            if (!scoreMatch) return null

            const score = parseFloat(scoreMatch[1])
            return isNaN(score) ? null : score
        } catch (error) {
            console.error("Error checking match with OpenAI:", error)
            return null
        }
    }

    async generateMatches(post: Post) {
        // Get all active posts except the current one
        const otherPosts = await this.prisma.post.findMany({
            where: {
                id: { not: post.id },
                status: "ACTIVE",
            },
            include: {
                user: true,
            },
        })

        const matches = []

        for (const otherPost of otherPosts) {
            // Check if there's a potential match and get score
            const score = await this.checkMatch(post, otherPost)
      
            if (score !== null && score > 0.5) { // Only consider matches with score > 0.5
                matches.push({
                    sourcePostId: post.id,
                    targetPostId: otherPost.id,
                    method: MatchMethod.GPT,
                    score: score,
                })
            }
        }

        // Sort matches by score in descending order and take top 3
        const topMatches = matches
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)

        // Create matches in database
        if (topMatches.length > 0) {
            await this.prisma.matchingSuggestion.createMany({
                data: topMatches,
            })
        }

        return topMatches
    }
} 
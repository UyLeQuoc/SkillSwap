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
            // Check if there's a potential match
            const isMatch = await this.checkMatch(post, otherPost)
      
            if (isMatch) {
                matches.push({
                    sourcePostId: post.id,
                    targetPostId: otherPost.id,
                    method: MatchMethod.GPT,
                    score: 0.8, // Default score for GPT matches
                })
            }
        }

        // Create matches in database
        if (matches.length > 0) {
            await this.prisma.matchingSuggestion.createMany({
                data: matches,
            })
        }

        return matches
    }

    private async checkMatch(post1: Post, post2: Post): Promise<boolean> {
        try {
            const prompt = `Check if these two skill swap posts are a good match:
Post 1: Has "${post1.haveSkill}" and wants "${post1.wantSkill}"
Post 2: Has "${post2.haveSkill}" and wants "${post2.wantSkill}"

Are these posts a good match for a skill swap? Answer with just "yes" or "no".`

            const response = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo-instruct",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                max_tokens: 10,
                temperature: 0.3,
            })

            const answer = response.choices[0].message.content?.toLowerCase().trim()
            return answer === "yes"
        } catch (error) {
            console.error("Error checking match with OpenAI:", error)
            return false
        }
    }
} 
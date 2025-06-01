import { Injectable } from "@nestjs/common"
import { SuiService } from "../sui/sui.service"
import { DealStatus, DealType } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class DealsService {
    constructor(
    private prisma: PrismaService,
    private suiService: SuiService,
    ) {}

    async createDeal(
        userAId: string,
        userBId: string,
        postAId: string,
        postBId?: string,
    ) {
        // Check for existing active deals between these users
        const existingDeal = await this.prisma.deal.findFirst({
            where: {
                OR: [
                    {
                        userAId,
                        userBId,
                        status: {
                            in: [DealStatus.PENDING, DealStatus.AGREED],
                        },
                    },
                    {
                        userAId: userBId,
                        userBId: userAId,
                        status: {
                            in: [DealStatus.PENDING, DealStatus.AGREED],
                        },
                    },
                ],
            },
        })

        if (existingDeal) {
            throw new Error("An active deal already exists between these users")
        }

        // Check if either post is already part of an active deal
        const existingPostDeal = await this.prisma.deal.findFirst({
            where: {
                OR: [
                    {
                        postAId,
                        status: {
                            in: [DealStatus.PENDING, DealStatus.AGREED],
                        },
                    },
                    {
                        postBId,
                        status: {
                            in: [DealStatus.PENDING, DealStatus.AGREED],
                        },
                    },
                ],
            },
        })

        if (existingPostDeal) {
            throw new Error("One or both posts are already part of an active deal")
        }

        return this.prisma.deal.create({
            data: {
                userAId,
                userBId,
                postAId,
                postBId,
                status: DealStatus.PENDING,
                type: DealType.SKILL_SWAP,
            },
        })
    }

    async acceptDeal(dealId: string, userId: string) {
        const deal = await this.prisma.deal.findUnique({
            where: { id: dealId },
        })

        if (!deal) {
            throw new Error("Deal not found")
        }

        if (deal.userBId !== userId) {
            throw new Error("Only the recipient can accept the deal")
        }

        if (deal.status !== DealStatus.PENDING) {
            throw new Error("Only pending deals can be accepted")
        }

        return this.prisma.deal.update({
            where: { id: dealId },
            data: { status: DealStatus.AGREED },
        })
    }

    async rejectDeal(dealId: string, userId: string) {
        const deal = await this.prisma.deal.findUnique({
            where: { id: dealId },
        })

        if (!deal) {
            throw new Error("Deal not found")
        }

        if (deal.userBId !== userId) {
            throw new Error("Only the recipient can reject the deal")
        }

        if (deal.status !== DealStatus.PENDING) {
            throw new Error("Only pending deals can be rejected")
        }

        return this.prisma.deal.update({
            where: { id: dealId },
            data: { status: DealStatus.CANCELLED },
        })
    }

    async completeDeal(dealId: string, userId: string) {
        const deal = await this.prisma.deal.findUnique({
            where: { id: dealId },
            include: {
                postA: true,
                postB: true,
                userA: true,
                userB: true,
                reviews: true,
            },
        })

        if (!deal) {
            throw new Error("Deal not found")
        }

        if (deal.userAId !== userId && deal.userBId !== userId) {
            throw new Error("Only deal participants can complete the deal")
        }

        if (deal.status !== DealStatus.AGREED) {
            throw new Error("Only agreed deals can be completed")
        }

        if (deal.reviews.length !== 2) {
            throw new Error("Both users must submit reviews before completing the deal")
        }

        // Mint skill badges for both users
        const [badgeA, badgeB] = await Promise.all([
            this.suiService.mintSkillBadge(
                deal.userA.wallet,
                deal.postB?.haveSkill || "",
            ),
            this.suiService.mintSkillBadge(deal.userB.wallet, deal.postA?.haveSkill || ""),
        ])

        // Create skill badge records
        await Promise.all([
            this.prisma.skillBadge.create({
                data: {
                    userId: deal.userAId,
                    verifierId: deal.userBId,
                    skillName: deal.postB?.haveSkill || "",
                    suiObjectId: badgeA,
                },
            }),
            this.prisma.skillBadge.create({
                data: {
                    userId: deal.userBId,
                    verifierId: deal.userAId,
                    skillName: deal.postA?.haveSkill || "",
                    suiObjectId: badgeB,
                },
            }),
        ])

        return this.prisma.deal.update({
            where: { id: dealId },
            data: {
                status: DealStatus.COMPLETED,
                completedAt: new Date(),
            },
        })
    }

    async cancelDeal(dealId: string, userId: string) {
        const deal = await this.prisma.deal.findUnique({
            where: { id: dealId },
        })

        if (!deal) {
            throw new Error("Deal not found")
        }

        if (deal.userAId !== userId) {
            throw new Error("Only the proposer can cancel the deal")
        }

        if (deal.status !== DealStatus.PENDING) {
            throw new Error("Only pending deals can be cancelled")
        }

        return this.prisma.deal.update({
            where: { id: dealId },
            data: { status: DealStatus.CANCELLED },
        })
    }

    async getDealById(dealId: string) {
        const deal = await this.prisma.deal.findUnique({
            where: { id: dealId },
            include: {
                userA: true,
                userB: true,
                postA: true,
                postB: true,
                reviews: {
                    include: {
                        reviewer: true,
                        reviewee: true,
                    },
                },
            },
        })

        if (!deal) {
            throw new Error("Deal not found")
        }

        return deal
    }
}

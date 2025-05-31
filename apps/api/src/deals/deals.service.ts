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

    async confirmDeal(dealId: string, userId: string) {
        const deal = await this.prisma.deal.findUnique({
            where: { id: dealId },
            include: {
                reviews: true,
            },
        })

        if (!deal) {
            throw new Error("Deal not found")
        }

        if (deal.userAId !== userId && deal.userBId !== userId) {
            throw new Error("User is not part of this deal")
        }

        // If both users have confirmed (2 reviews exist), update status to AGREED
        if (deal.reviews.length === 2) {
            return this.prisma.deal.update({
                where: { id: dealId },
                data: { status: DealStatus.AGREED },
            })
        }

        return deal
    }

    async completeDeal(dealId: string) {
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

        if (!deal.postA) {
            throw new Error("Post A not found")
        }

        if (deal.status !== DealStatus.AGREED) {
            throw new Error("Deal must be in AGREED status to complete")
        }

        if (deal.reviews.length !== 2) {
            throw new Error(
                "Both users must submit reviews before completing the deal",
            )
        }

        // Mint skill badges for both users
        const [badgeA, badgeB] = await Promise.all([
            this.suiService.mintSkillBadge(
                deal.userA.wallet,
                deal.postB?.haveSkill || "",
            ),
            this.suiService.mintSkillBadge(deal.userB.wallet, deal.postA.haveSkill),
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
                    skillName: deal.postA.haveSkill,
                    suiObjectId: badgeB,
                },
            }),
        ])

        // Update deal status to completed
        return this.prisma.deal.update({
            where: { id: dealId },
            data: {
                status: DealStatus.COMPLETED,
                completedAt: new Date(),
            },
        })
    }

    async getDealById(dealId: string) {
        return this.prisma.deal.findUnique({
            where: { id: dealId },
            include: {
                userA: true,
                userB: true,
                postA: true,
                postB: true,
                reviews: true,
            },
        })
    }
}

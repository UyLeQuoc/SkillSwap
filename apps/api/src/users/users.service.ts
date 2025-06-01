import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { User } from "./entities/user.entity"
import { DealStatus } from "@prisma/client"

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        const users = await this.prisma.user.findMany({
            include: {
                dealsAsA: true,
                dealsAsB: true,
            },
        })
        return users.map((user: User) => new User(user))
    }

    async findOne(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                dealsAsA: true,
                dealsAsB: true,
            },
        })
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`)
        }
        return new User(user)
    }

    async findByWallet(wallet: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { wallet },
            include: {
                dealsAsA: true,
                dealsAsB: true,
            },
        })
        if (!user) {
            throw new NotFoundException(`User with wallet ${wallet} not found`)
        }
        return new User(user)
    }

    async updateAvatar(id: string, avatarUrl: string): Promise<User> {
        const user = await this.prisma.user.update({
            where: { id },
            data: { avatarUrl },
            include: {
                dealsAsA: true,
                dealsAsB: true,
            },
        })
        return new User(user)
    }

    async remove(id: string) {
        const user = await this.prisma.user.delete({
            where: { id },
            include: {
                dealsAsA: true,
                dealsAsB: true,
            },
        })
        return new User(user)
    }

    async getDealsAsA(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                dealsAsA: {
                    include: {
                        userA: true,
                        userB: true,
                        postA: true,
                        postB: true,
                    },
                },
            },
        })
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`)
        }
        return user.dealsAsA
    }

    async getDealsAsB(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                dealsAsB: {
                    include: {
                        userA: true,
                        userB: true,
                        postA: true,
                        postB: true,
                    },
                },
            },
        })
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`)
        }
        return user.dealsAsB
    }

    async getActiveDeals(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                dealsAsA: {
                    where: {
                        status: {
                            in: [DealStatus.PENDING, DealStatus.AGREED],    
                        },
                    },
                    include: {
                        userA: true,
                        userB: true,
                        postA: true,
                        postB: true,
                    },
                },
                dealsAsB: {
                    where: {
                        status: {
                            in: [DealStatus.PENDING, DealStatus.AGREED],
                        },
                    },
                    include: {
                        userA: true,
                        userB: true,
                        postA: true,
                        postB: true,
                    },
                },
            },
        })
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`)
        }
        return {
            dealsAsA: user.dealsAsA,
            dealsAsB: user.dealsAsB,
        }
    }
}

import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { User } from "./entities/user.entity"

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        const users = await this.prisma.user.findMany()
        return users.map((user: User) => new User(user))
    }

    async findOne(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        })
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`)
        }
        return new User(user)
    }

    async findByWallet(wallet: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { wallet },
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
        })
        return new User(user)
    }

    async remove(id: string) {
        const user = await this.prisma.user.delete({
            where: { id },
        })
        return new User(user)
    }
}

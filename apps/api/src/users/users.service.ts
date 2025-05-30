import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateUserInput } from "./inputs/create-user.input"
import { UpdateUserInput } from "./inputs/update-user.input"
import { PrismaService } from "../dynamic-modules"
import { UserEntity } from "./entities/user.entity"

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserInput: CreateUserInput) {
        const user = await this.prisma.user.create({
            data: createUserInput,
        })
        return new UserEntity(user)
    }

    async findAll() {
        const users = await this.prisma.user.findMany()
        return users.map((user: UserEntity) => new UserEntity(user))
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        })
        if (!user) {
            throw new NotFoundException("User not found")
        }
        return new UserEntity(user)
    }

    async update(id: string, updateUserInput: UpdateUserInput) {
        const user = await this.prisma.user.update({
            where: { id },
            data: updateUserInput,
        })
        return new UserEntity(user)
    }

    async remove(id: string) {
        const user = await this.prisma.user.delete({
            where: { id },
        })
        return new UserEntity(user)
    }
} 
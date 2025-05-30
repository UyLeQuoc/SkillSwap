import { Module } from "@nestjs/common"
import { UsersResolver } from "./users.resolver"
import { UsersService } from "./users.service"
import { PrismaService } from "src/dynamic-modules"

@Module({
    providers: [UsersResolver, UsersService, PrismaService],
    exports: [UsersService],
})
export class UsersModule {} 
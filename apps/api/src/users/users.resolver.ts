import { Args, Mutation, Query, Resolver, ID } from "@nestjs/graphql"
import { UsersService } from "./users.service"
import { User } from "./entities/user.entity"
import { UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { CurrentUser } from "src/auth/decorators/current-user.decorator"

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    // @Query(() => [User])
    // findAll() {
    //     return this.usersService.findAll()
    // }

    // @Query(() => User)
    // @UseGuards(JwtAuthGuard)
    // async me(@CurrentUser() user: User) {
    //     return this.usersService.findOne(user.id)
    // }

    // @Query(() => User)
    // @UseGuards(JwtAuthGuard)
    // async user(@Args("id", { type: () => ID }) id: string) {
    //     return this.usersService.findOne(id)
    // }

    // @Mutation(() => User)
    // @UseGuards(JwtAuthGuard)
    // async updateAvatar(
    //     @CurrentUser() user: User,
    //     @Args("avatarUrl") avatarUrl: string
    // ) {
    //     return this.usersService.updateAvatar(user.id, avatarUrl)
    // }

    // @Mutation(() => User)
    // removeUser(@Args("id") id: string) {
    //     return this.usersService.remove(id)
    // }
} 
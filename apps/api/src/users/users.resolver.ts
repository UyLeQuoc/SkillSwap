import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { UsersService } from "./users.service"
import { User, DealsResponse, ActiveDealsResponse } from "./entities/user.entity"
import { UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { CurrentUser } from "../auth/decorators/current-user.decorator"

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    // @Query(() => [User])
    // findAll() {
    //     return this.usersService.findAll()
    // }

    @Query(() => User)
    @UseGuards(JwtAuthGuard)
    async getCurrentUser(@CurrentUser() user: User) {
        return this.usersService.findOne(user.id)
    }

    @Query(() => User)
    @UseGuards(JwtAuthGuard)
    async userByWallet(@Args("wallet") wallet: string) {
        return this.usersService.findByWallet(wallet)
    }

    @Query(() => DealsResponse)
    @UseGuards(JwtAuthGuard)
    async getDealsByWallet(@Args("wallet") wallet: string) {
        const user = await this.usersService.findByWallet(wallet)
        const dealsAsA = await this.usersService.getDealsAsA(user.id)
        const dealsAsB = await this.usersService.getDealsAsB(user.id)
        return { dealsAsA, dealsAsB }
    }

    @Query(() => ActiveDealsResponse)
    @UseGuards(JwtAuthGuard)
    async getActiveDeals(@Args("wallet") wallet: string) {
        const user = await this.usersService.findByWallet(wallet)
        return this.usersService.getActiveDeals(user.id)
    }

    @Mutation(() => User)
    @UseGuards(JwtAuthGuard)
    async updateAvatar(
        @CurrentUser() user: User,
        @Args("avatarUrl") avatarUrl: string
    ) {
        return this.usersService.updateAvatar(user.id, avatarUrl)
    }

    // @Mutation(() => User)
    // removeUser(@Args("id") id: string) {
    //     return this.usersService.remove(id)
    // }
}

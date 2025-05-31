import { Resolver, Mutation, Query, Args } from "@nestjs/graphql"
import { AuthService } from "./auth.service"
import { LoginResponse } from "./dto/login-response.dto"
import { LoginInput } from "./dto/login.input"
import { RefreshTokenInput } from "./dto/refresh-token.input"
import { User } from "../users/entities/user.entity"
import { UseGuards } from "@nestjs/common"
import { GraphqlJwtAuthGuard } from "./guards/graphql-jwt-auth.guard"
import { CurrentUser } from "./decorators/current-user.decorator"

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => LoginResponse)
    async loginWithWallet(@Args("input") input: LoginInput) {
        console.log(input)
        return this.authService.loginWithWallet(
            input.wallet,
            input.message,
            input.signature,
        )
    }

    @Mutation(() => LoginResponse)
    async refreshTokens(@Args("input") input: RefreshTokenInput) {
        return this.authService.refreshTokens(input.refreshToken)
    }

    @Query(() => User)
    @UseGuards(GraphqlJwtAuthGuard)
    async getCurrentUser(@CurrentUser() user: User) {
        return this.authService.getCurrentUser(user.id)
    }
}

import { Resolver, Mutation, Args } from "@nestjs/graphql"
import { AuthService } from "./auth.service"
import { LoginResponse } from "./dto/login-response.dto"
import { LoginInput } from "./dto/login.input"
import { RefreshTokenInput } from "./dto/refresh-token.input"

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
    async loginWithWallet(@Args("input") input: LoginInput) {
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
} 
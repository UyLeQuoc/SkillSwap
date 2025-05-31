import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { User } from "src/users/entities/user.entity"
import * as ed25519 from "@noble/ed25519"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class AuthService {
    constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    ) {}

    async validateWalletSignature(
        wallet: string,
        message: string,
        signature: string,
    ): Promise<boolean> {
        try {
            const isValid = await ed25519.verify(signature, message, wallet)
            return isValid
        } catch {
            return false
        }
    }

    async loginWithWallet(wallet: string, message: string, signature: string) {
        const isValid = await this.validateWalletSignature(
            wallet,
            message,
            signature,
        )
        if (!isValid) {
            throw new UnauthorizedException("Invalid signature")
        }

        // Upsert user
        const user = await this.prisma.user.upsert({
            where: { wallet },
            update: {},
            create: {
                wallet,
            },
        })

        // Generate tokens
        const [accessToken, refreshToken] = await Promise.all([
            this.generateAccessToken(user),
            this.generateRefreshToken(user),
        ])

        return {
            user,
            accessToken,
            refreshToken,
        }
    }

    private async generateAccessToken(user: User) {
        const payload = {
            sub: user.id,
            wallet: user.wallet,
            role: user.role,
        }
        return this.jwtService.signAsync(payload, {
            expiresIn: "1h",
        })
    }

    private async generateRefreshToken(user: User) {
        const payload = {
            sub: user.id,
            wallet: user.wallet,
        }
        return this.jwtService.signAsync(payload, {
            expiresIn: "7d",
        })
    }

    async refreshTokens(refreshToken: string) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken)
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
            })

            if (!user) {
                throw new UnauthorizedException("User not found")
            }

            const [accessToken, newRefreshToken] = await Promise.all([
                this.generateAccessToken(user),
                this.generateRefreshToken(user),
            ])

            return {
                accessToken,
                refreshToken: newRefreshToken,
            }
        } catch {
            throw new UnauthorizedException("Invalid refresh token")
        }
    }
}

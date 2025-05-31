import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { User } from "src/users/entities/user.entity"
import { PrismaService } from "src/prisma/prisma.service"
import { verifyPersonalMessageSignature } from "@mysten/sui/verify"

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    // async validateWalletSignature(
    //     wallet: string,
    //     message: string,
    //     signature: string,
    // ): Promise<boolean> {
    //     try {
    //         const messageEncoded = new TextEncoder().encode(message)

    //         const publicKey = await verifyPersonalMessageSignature(
    //             messageEncoded,
    //             signature
    //         )

    //         // Verify that the signature was signed by the provided wallet address
    //         if (publicKey.toSuiAddress() !== wallet) {
    //             throw new Error("Signature was valid, but was signed by a different wallet")
    //         }

    //         return true
    //     } catch (error) {
    //         console.error("Signature verification failed:", error)
    //         return false
    //     }
    // }

    async loginWithWallet(wallet: string, message: string, signature: string) {
        // const isValid = await this.validateWalletSignature(
        //     wallet,
        //     message,
        //     signature,
        // )
        // if (!isValid) {
        //     throw new UnauthorizedException("Invalid signature")
        // }

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

    async getCurrentUser(userId: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                posts: true,
                skillBadges: true,
                verifiedBadges: true,
                reviewsGiven: true,
                reviewsReceived: true,
                dealsAsA: true,
                dealsAsB: true,
            },
        })

        if (!user) {
            throw new UnauthorizedException("User not found")
        }

        return user
    }
}

import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { envConfig, PrismaService } from "src/dynamic-modules"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: envConfig().jwt.secret,
        })
    }

    async validate(payload: {
        sub: string
    }) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
        })
        return user
    }
} 
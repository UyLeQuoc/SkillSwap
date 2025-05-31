import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { AuthService } from "./auth.service"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { PassportModule } from "@nestjs/passport"
import { PrismaModule } from "src/dynamic-modules/prisma/prisma.module"

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "1h" },
        }),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {} 
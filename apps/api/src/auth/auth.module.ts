import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { AuthService } from "./auth.service"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { PassportModule } from "@nestjs/passport"
import { PrismaModule } from "src/prisma/prisma.module"
import { AuthResolver } from "./auth.resolver"
import { envConfig } from "src/dynamic-modules"
@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            secret: envConfig().jwt.secret,
            signOptions: { expiresIn: "1h" },
        }),
    ],
    providers: [AuthService, JwtStrategy, AuthResolver],
    exports: [AuthService],
})
export class AuthModule {}

import { Module } from "@nestjs/common"
import { SuiService } from "./sui.service"
import { PrismaModule } from "src/prisma/prisma.module"
import { SuiResolver } from "./sui.resolver"

@Module({
    imports: [PrismaModule],
    providers: [SuiService, SuiResolver],
    exports: [SuiService],
})
export class SuiModule {}

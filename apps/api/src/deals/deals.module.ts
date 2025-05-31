import { Module } from "@nestjs/common"
import { DealsService } from "./deals.service"
import { DealsResolver } from "./deals.resolver"
import { PrismaModule } from "../prisma/prisma.module"
import { SuiModule } from "../sui/sui.module"

@Module({
    imports: [PrismaModule, SuiModule],
    providers: [DealsService, DealsResolver],
    exports: [DealsService],
})
export class DealsModule {}

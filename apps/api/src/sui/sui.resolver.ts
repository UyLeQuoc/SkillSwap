import { Resolver, Mutation, Args, Query } from "@nestjs/graphql"
import { SuiService } from "./sui.service"
import { SkillBadgeDto } from "./dto/skill-badge.dto"
import { GetBadgesByWalletInput } from "./dto/get-badges-by-wallet.input"

@Resolver()
export class SuiResolver {
    constructor(private readonly suiService: SuiService) {}

    @Mutation(() => String)
    async mintSkillBadge(
        @Args("recipient") recipient: string,
        @Args("skillName") skillName: string,
    ): Promise<string> {
        console.log(recipient, skillName)
        return this.suiService.mintSkillBadge(recipient, skillName)
    }

    @Query(() => [SkillBadgeDto])
    async getBadgesByWallet(
        @Args("input") input: GetBadgesByWalletInput
    ): Promise<SkillBadgeDto[]> {
        return this.suiService.getBadgesByWallet(input.wallet)
    }
}

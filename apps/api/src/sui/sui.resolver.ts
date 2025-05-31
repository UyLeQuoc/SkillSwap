import { Resolver, Mutation, Args } from "@nestjs/graphql"
import { SuiService } from "./sui.service"

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
}

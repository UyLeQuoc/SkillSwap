import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { CurrentUser } from "src/auth/decorators/current-user.decorator"
import { GraphqlJwtAuthGuard } from "src/auth/guards/graphql-jwt-auth.guard"
import { DealsService } from "./deals.service"
import { CreateDealInput } from "./dto/create-deal.input"
import { Deal } from "./entities/deal.entity"

@Resolver(() => Deal)
@UseGuards(GraphqlJwtAuthGuard)
export class DealsResolver {
    constructor(private readonly dealsService: DealsService) {}

  @Mutation(() => Deal)
    async createDeal(
    @CurrentUser() user: { id: string },
    @Args("input") input: CreateDealInput,
    ) {
        return this.dealsService.createDeal(
            user.id,
            input.userBId,
            input.postAId,
            input.postBId,
        )
    }

  @Mutation(() => Deal)
  async confirmDeal(
    @CurrentUser() user: { id: string },
    @Args("dealId") dealId: string,
  ) {
      return this.dealsService.confirmDeal(dealId, user.id)
  }

  @Mutation(() => Deal)
  async completeDeal(
    @CurrentUser() user: { id: string },
    @Args("dealId") dealId: string,
  ) {
      return this.dealsService.completeDeal(dealId)
  }

  @Query(() => Deal)
  async deal(
    @CurrentUser() user: { id: string },
    @Args("dealId") dealId: string,
  ) {
      return this.dealsService.getDealById(dealId)
  }
}

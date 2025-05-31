import { Field, ID, ObjectType } from "@nestjs/graphql"
import { DealStatus, DealType } from "@prisma/client"

@ObjectType()
export class Deal {
  @Field(() => ID)
      id: string

  @Field(() => String)
      userAId: string

  @Field(() => String)
      userBId: string

  @Field(() => String, { nullable: true })
      postAId?: string

  @Field(() => String, { nullable: true })
      postBId?: string

  @Field(() => DealStatus)
      status: DealStatus

  @Field(() => DealType)
      type: DealType

  @Field(() => Date)
      createdAt: Date

  @Field(() => Date, { nullable: true })
      completedAt?: Date
}

import { Field, ObjectType, registerEnumType } from "@nestjs/graphql"
import { DealStatus, DealType } from "@prisma/client"

registerEnumType(DealStatus, {
  name: "DealStatus",
  description: "The status of a deal",
})

registerEnumType(DealType, {
  name: "DealType",
  description: "The type of a deal",
})

@ObjectType()
export class Deal {
  @Field(() => String)
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

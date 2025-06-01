import { Field, ObjectType, registerEnumType } from "@nestjs/graphql"
import { DealStatus, DealType, Deal as PrismaDeal } from "@prisma/client"
import { User } from "../../users/entities/user.entity"
import { Post } from "../../posts/entities/post.entity"
import { Review } from "./review.entity"

registerEnumType(DealStatus, {
  name: "DealStatus",
  description: "The status of the deal",
})

registerEnumType(DealType, {
  name: "DealType",
  description: "The type of the deal",
})

@ObjectType()
export class Deal implements PrismaDeal {
  @Field(() => String)
  id: string

  @Field(() => String)
  userAId: string

  @Field(() => String)
  userBId: string

  @Field(() => String, { nullable: true })
  postAId: string | null

  @Field(() => String, { nullable: true })
  postBId: string | null

  @Field(() => DealStatus)
  status: DealStatus

  @Field(() => DealType)
  type: DealType

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date, { nullable: true })
  completedAt: Date | null

  @Field(() => User, { nullable: true })
  userA?: User

  @Field(() => User, { nullable: true })
  userB?: User

  @Field(() => Post, { nullable: true })
  postA?: Post

  @Field(() => Post, { nullable: true })
  postB?: Post

  @Field(() => [Review], { nullable: true })
  reviews?: Review[]

  constructor(partial: Partial<Deal>) {
    Object.assign(this, partial)
  }
}

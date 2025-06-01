import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Roles } from "@prisma/client"
import { Deal } from "../../deals/entities/deal.entity"
import { Post } from "../../posts/entities/post.entity"

@ObjectType()
export class User {
  @Field(() => ID)
      id: string

  @Field()
      wallet: string

  @Field(() => String, { nullable: true })
      name?: string | null

  @Field(() => String, { nullable: true })
      avatarUrl?: string | null

  @Field(() => String, { nullable: true })
      bio?: string | null

  @Field()
      createdAt: Date

  @Field()
      updatedAt: Date

  @Field(() => String)
      role: Roles

  @Field(() => [Deal], { nullable: true })
      dealsAsA?: Deal[]

  @Field(() => [Deal], { nullable: true })
      dealsAsB?: Deal[]

  @Field(() => [Post], { nullable: true })
      posts?: Post[]

  constructor(partial: Partial<User>) {
      Object.assign(this, partial)
  }
}

@ObjectType()
export class DealsResponse {
  @Field(() => [Deal], { nullable: true })
      dealsAsA?: Deal[]

  @Field(() => [Deal], { nullable: true })
      dealsAsB?: Deal[]
}

@ObjectType()
export class ActiveDealsResponse {
  @Field(() => [Deal], { nullable: true })
      dealsAsA?: Deal[]

  @Field(() => [Deal], { nullable: true })
      dealsAsB?: Deal[]
}

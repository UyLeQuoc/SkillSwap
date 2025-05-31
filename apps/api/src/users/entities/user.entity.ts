import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Roles } from "@prisma/client"

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

  constructor(partial: Partial<User>) {
      Object.assign(this, partial)
  }
}

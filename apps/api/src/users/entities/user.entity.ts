import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Roles } from "@prisma/client"

@ObjectType()
export class User {
  @Field(() => ID)
      id: string

  @Field()
      wallet: string

  @Field({ nullable: true })
      name?: string | null

  @Field({ nullable: true })
      avatarUrl?: string | null

  @Field({ nullable: true })
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

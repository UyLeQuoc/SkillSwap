import { ObjectType, Field, ID } from "@nestjs/graphql"
import { PostTag as PrismaPostTag } from "@prisma/client"

@ObjectType()
export class PostTag implements PrismaPostTag {
    @Field(() => ID)
    id: string

    @Field()
    name: string

    constructor(partial: Partial<PostTag>) {
        Object.assign(this, partial)
    }
} 
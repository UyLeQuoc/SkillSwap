import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql"
import { PostStatus, PostType, Post as PrismaPost } from "@prisma/client"
import { User } from "../../users/entities/user.entity"
import { PostTag } from "./post-tag.entity"
import { MatchingSuggestion } from "./matching-suggestion.entity"
import { Deal } from "../../deals/entities/deal.entity"

registerEnumType(PostStatus, {
    name: "PostStatus",
    description: "The status of the post",
})

registerEnumType(PostType, {
    name: "PostType",
    description: "The type of the post",
})

@ObjectType()
export class Post implements PrismaPost {
    @Field(() => ID)
    id: string

    @Field(() => String)
    userId: string

    @Field(() => String)
    haveSkill: string

    @Field(() => String)
    wantSkill: string

    @Field(() => String, { nullable: true })
    description: string | null

    @Field(() => PostStatus)
    status: PostStatus

    @Field(() => PostType)
    type: PostType

    @Field(() => Date)
    createdAt: Date

    @Field(() => User, { nullable: true })
    user?: User

    @Field(() => [PostTag], { nullable: true })
    tags?: PostTag[]

    @Field(() => [Deal], { nullable: true })
    dealsAsPostA?: Deal[]

    @Field(() => [Deal], { nullable: true })
    dealsAsPostB?: Deal[]

    @Field(() => [MatchingSuggestion], { nullable: true })
    matchAsSource?: MatchingSuggestion[]

    @Field(() => [MatchingSuggestion], { nullable: true })
    matchAsTarget?: MatchingSuggestion[]

    constructor(partial: Partial<Post>) {
        Object.assign(this, partial)
    }
} 
import { Field, ObjectType, registerEnumType } from "@nestjs/graphql"
import { PostStatus, PostType, Post as PrismaPost } from "@prisma/client"
import { User } from "../../users/entities/user.entity"
import { PostTag } from "./post-tag.entity"

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
    @Field(() => String)
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

    constructor(partial: Partial<Post>) {
        Object.assign(this, partial)
    }
} 
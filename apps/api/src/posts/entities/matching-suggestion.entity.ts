import { Field, ObjectType, registerEnumType } from "@nestjs/graphql"
import { MatchMethod } from "@prisma/client"
import { Post } from "./post.entity"

registerEnumType(MatchMethod, {
    name: "MatchMethod",
})

@ObjectType()
export class MatchingSuggestion {
	@Field(() => String)
	id: string

	@Field(() => String)
	sourcePostId: string

	@Field(() => String)
	targetPostId: string

	@Field(() => MatchMethod)
	method: MatchMethod

	@Field(() => Number, { nullable: true })
	score: number | null

	@Field(() => Date)
	createdAt: Date

	@Field(() => Post)
	sourcePost: Post

	@Field(() => Post)
	targetPost: Post

	constructor(partial: Partial<MatchingSuggestion>) {
		Object.assign(this, partial)
	}
} 
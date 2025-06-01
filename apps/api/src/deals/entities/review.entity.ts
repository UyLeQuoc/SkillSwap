import { Field, ObjectType } from "@nestjs/graphql"
import { Review as PrismaReview } from "@prisma/client"
import { User } from "../../users/entities/user.entity"
import { Deal } from "./deal.entity"

@ObjectType()
export class Review implements PrismaReview {
    @Field(() => String)
    id: string

    @Field(() => String)
    dealId: string

    @Field(() => String)
    reviewerId: string

    @Field(() => String)
    revieweeId: string

    @Field(() => Number)
    rating: number

    @Field(() => String, { nullable: true })
    comment: string | null

    @Field(() => Date)
    createdAt: Date

    @Field(() => User, { nullable: true })
    reviewer?: User

    @Field(() => User, { nullable: true })
    reviewee?: User

    @Field(() => Deal, { nullable: true })
    deal?: Deal

    constructor(partial: Partial<Review>) {
        Object.assign(this, partial)
    }
}

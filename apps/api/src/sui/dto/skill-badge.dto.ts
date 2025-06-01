import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class SkillBadgeDto {
    @Field(() => String)
    id: string

    @Field(() => String)
    userId: string

    @Field(() => String)
    verifierId: string

    @Field(() => String)
    skillName: string

    @Field(() => String)
    suiObjectId: string

    @Field(() => Date)
    mintedAt: Date

    constructor(partial: Partial<SkillBadgeDto>) {
        Object.assign(this, partial)
    }
} 
import { Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class UserEntity {
    @Field(() => ID)
        id: string

    @Field(() => String, { nullable: true })
        name?: string

    @Field(() => String, { nullable: true })
        email?: string

    @Field(() => String, { nullable: true })
        password?: string

    @Field(() => Date, { nullable: true })
        createdAt?: Date

    @Field(() => Date, { nullable: true })
        updatedAt?: Date

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial)
    }
}

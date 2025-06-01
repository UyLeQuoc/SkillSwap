import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"

@InputType()
export class GetBadgesByWalletInput {
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    wallet: string
} 
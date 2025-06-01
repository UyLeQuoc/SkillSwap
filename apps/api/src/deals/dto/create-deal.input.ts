import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

@InputType()
export class CreateDealInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
      userBId: string

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
      postAId: string

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
      postBId?: string
}

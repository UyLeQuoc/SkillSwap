import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

@InputType()
export class CreateDealInput {
  @Field()
  @IsString()
  @IsNotEmpty()
      userBId: string

  @Field()
  @IsString()
  @IsNotEmpty()
      postAId: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
      postBId?: string
}

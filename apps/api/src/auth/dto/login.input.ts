import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
      wallet: string

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
      message: string

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
      signature: string
}

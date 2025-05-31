import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsEnum, IsOptional, IsArray } from "class-validator";
import { PostType } from "@prisma/client";

@InputType()
export class CreateTagInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    name: string;
}

@InputType()
export class CreatePostInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    haveSkill: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    wantSkill: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string;

    @Field(() => PostType)
    @IsEnum(PostType)
    type: PostType;

    @Field(() => [CreateTagInput], { nullable: true })
    @IsOptional()
    @IsArray()
    tags?: CreateTagInput[];
} 
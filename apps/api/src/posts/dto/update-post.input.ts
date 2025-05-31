import { Field, InputType, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";
import { PostType, PostStatus } from "@prisma/client";

@InputType()
export class UpdatePostInput {
    @Field(() => ID)
    @IsNotEmpty()
    id: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    haveSkill?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    wantSkill?: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string;

    @Field(() => PostType, { nullable: true })
    @IsOptional()
    @IsEnum(PostType)
    type?: PostType;

    @Field(() => PostStatus, { nullable: true })
    @IsOptional()
    @IsEnum(PostStatus)
    status?: PostStatus;
} 
import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { PostsService } from "./posts.service";
import { CreatePostInput, CreateTagInput } from "./dto/create-post.input";
import { UpdatePostInput } from "./dto/update-post.input";
import { Post } from "./entities/post.entity";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { User } from "../users/entities/user.entity";
import { GraphqlJwtAuthGuard } from "src/auth/guards/graphql-jwt-auth.guard";
import { PostTag } from "./entities/post-tag.entity";
import { MatchingSuggestion } from "./entities/matching-suggestion.entity";

@Resolver(() => Post)
export class PostsResolver {
    constructor(private readonly postsService: PostsService) {}

    @Mutation(() => Post)
    @UseGuards(GraphqlJwtAuthGuard)
    async createPost(
        @Args("input") createPostInput: CreatePostInput,
        @CurrentUser() user: User,
    ) {
        return this.postsService.create(createPostInput, user);
    }

    @Query(() => [Post])
    async posts() {
        return this.postsService.findAll();
    }

    @Query(() => Post)
    async post(@Args("id", { type: () => ID }) id: string) {
        return this.postsService.findOne(id);
    }

    @Mutation(() => Post)
    @UseGuards(GraphqlJwtAuthGuard)
    async updatePost(
        @Args("input") updatePostInput: UpdatePostInput,
        @CurrentUser() user: User,
    ) {
        const post = await this.postsService.findOne(updatePostInput.id);
        if (post.userId !== user.id) {
            throw new Error("Not authorized to update this post");
        }
        return this.postsService.update(updatePostInput.id, updatePostInput);
    }

    @Mutation(() => Post)
    @UseGuards(GraphqlJwtAuthGuard)
    async removePost(
        @Args("id", { type: () => ID }) id: string,
        @CurrentUser() user: User,
    ) {
        const post = await this.postsService.findOne(id);
        if (post.userId !== user.id) {
            throw new Error("Not authorized to remove this post");
        }
        return this.postsService.remove(id);
    }

    @Query(() => [Post])
    @UseGuards(GraphqlJwtAuthGuard)
    async myPosts(@CurrentUser() user: User) {
        return this.postsService.findByUser(user.id);
    }

    @Query(() => [Post])
    async postsByWallet(@Args("wallet") wallet: string) {
        return this.postsService.findByWallet(wallet);
    }

    @Mutation(() => PostTag)
    @UseGuards(GraphqlJwtAuthGuard)
    async createTag(
        @Args("input") createTagInput: CreateTagInput,
    ) {
        return this.postsService.createTag(createTagInput);
    }

    @Mutation(() => [MatchingSuggestion])
    @UseGuards(GraphqlJwtAuthGuard)
    async refreshMatches(
        @Args("postId", { type: () => ID }) postId: string,
        @CurrentUser() user: User,
    ) {
        console.log("postId", postId);

        const post = await this.postsService.findOne(postId);
        if (post.userId !== user.id) {
            throw new Error("Not authorized to refresh matches for this post");
        }
        return this.postsService.refreshMatches(postId);
    }
} 
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostInput } from "./dto/create-post.input";
import { UpdatePostInput } from "./dto/update-post.input";
import { Post } from "./entities/post.entity";
import { PostStatus } from "@prisma/client";

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async create(createPostInput: CreatePostInput, userId: string): Promise<Post> {
        const post = await this.prisma.post.create({
            data: {
                userId,
                haveSkill: createPostInput.haveSkill,
                wantSkill: createPostInput.wantSkill,
                description: createPostInput.description ,
                type: createPostInput.type,
                status: PostStatus.ACTIVE,
            },
        });
        if (!post) {
            throw new Error("Post not found");
        }
        return new Post(post);
    }

    async findAll(): Promise<Post[]> {
        const posts = await this.prisma.post.findMany({
            where: {
                status: PostStatus.ACTIVE,
            },
            include: {
                user: true,
                tags: true,
            },
        });
        return posts.map(post => new Post(post));
    }

    async findOne(id: string): Promise<Post> {
        const post = await this.prisma.post.findUnique({
            where: { id },
            include: {
                user: true,
                tags: true,
            },
        });
        if (!post) {
            throw new Error("Post not found");
        }
        return new Post(post);
    }

    async update(id: string, updatePostInput: UpdatePostInput): Promise<Post> {
        const updatedPost = await this.prisma.post.update({
            where: { id },
            data: {
                haveSkill: updatePostInput.haveSkill,
                wantSkill: updatePostInput.wantSkill,
                description: updatePostInput.description,
                type: updatePostInput.type,
                status: updatePostInput.status,
            },
        });
        if (!updatedPost) {
            throw new Error("Post not found");
        }
        return new Post(updatedPost);
    }

    async remove(id: string): Promise<Post> {
        const updatedPost = await this.prisma.post.update({
            where: { id },
            data: {
                status: PostStatus.INACTIVE,
            },
        });
        if (!updatedPost) {
            throw new Error("Post not found");
        }
        return new Post(updatedPost);
    }

    async findByUser(userId: string): Promise<Post[]> {
        const posts = await this.prisma.post.findMany({
            where: {
                userId,
                status: PostStatus.ACTIVE,
            },
            include: {
                user: true,
                tags: true,
            },
        });
        return posts.map(post => new Post(post));
    }
} 
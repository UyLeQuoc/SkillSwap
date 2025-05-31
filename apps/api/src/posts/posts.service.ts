import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostInput, CreateTagInput } from "./dto/create-post.input";
import { UpdatePostInput } from "./dto/update-post.input";
import { Post } from "./entities/post.entity";
import { PostStatus } from "@prisma/client";
import { PostTag } from "./entities/post-tag.entity";

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async create(createPostInput: CreatePostInput, userId: string): Promise<Post> {
        const { tags, ...postData } = createPostInput;

        // Create or connect tags
        const tagConnections = tags?.map(tag => ({
            where: { name: tag.name },
            create: { name: tag.name }
        })) || [];

        const post = await this.prisma.post.create({
            data: {
                ...postData,
                userId,
                tags: {
                    connectOrCreate: tagConnections
                }
            },
            include: {
                user: true,
                tags: true
            }
        });

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

    async findByWallet(wallet: string): Promise<Post[]> {
        const posts = await this.prisma.post.findMany({
            where: {
                user: {
                    wallet,
                },
                status: PostStatus.ACTIVE,
            },
            include: {
                user: true,
                tags: true,
            },
        });
        return posts.map(post => new Post(post));
    }

    async createTag(createTagInput: CreateTagInput): Promise<PostTag> {
        const existingTag = await this.prisma.postTag.findUnique({
            where: { name: createTagInput.name }
        })
        if (existingTag) {
            return new PostTag(existingTag);
        }

        const tag = await this.prisma.postTag.create({
            data: {
                name: createTagInput.name
            }
        })
        return new PostTag(tag)
    }
} 
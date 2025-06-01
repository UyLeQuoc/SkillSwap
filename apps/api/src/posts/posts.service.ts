import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostInput, CreateTagInput } from "./dto/create-post.input";
import { UpdatePostInput } from "./dto/update-post.input";
import { Post } from "./entities/post.entity";
import { PostStatus } from "@prisma/client";
import { PostTag } from "./entities/post-tag.entity";
import { User } from "../users/entities/user.entity";

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async create(createPostInput: CreatePostInput, user: User) {
        const { tags, ...postData } = createPostInput;

        const post = await this.prisma.post.create({
            data: {
                ...postData,
                userId: user.id,
                tags: {
                    create: tags?.map((tag) => ({
                        name: tag.name,
                    })),
                },
            },
            include: {
                user: true,
                tags: true,
            },
        });

        return new Post(post);
    }

    async findAll() {
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

    async findOne(id: string) {
        const post = await this.prisma.post.findUnique({
            where: { id },
            include: {
                user: true,
                tags: true,
                matchAsSource: {
                    include: {
                        sourcePost: {
                            include: {
                                user: true,
                                tags: true,
                            },
                        },
                        targetPost: {
                            include: {
                                user: true,
                                tags: true,
                            },
                        },
                    },
                },
                matchAsTarget: {
                    include: {
                        sourcePost: {
                            include: {
                                user: true,
                                tags: true,
                            },
                        },
                        targetPost: {
                            include: {
                                user: true,
                                tags: true,
                            },
                        },
                    },
                },
                dealsAsPostA: {
                    include: {
                        userA: true,
                        userB: true,
                        reviews: {
                            include: {
                                reviewer: true,
                                reviewee: true,
                            },
                        },
                    },
                },
                dealsAsPostB: {
                    include: {
                        userA: true,
                        userB: true,
                        reviews: {
                            include: {
                                reviewer: true,
                                reviewee: true,
                            },
                        },
                    },
                },
            },
        });
        if (!post) {
            throw new Error("Post not found");
        }
        return new Post(post);
    }

    async update(id: string, updatePostInput: UpdatePostInput) {
        const { tags, ...postData } = updatePostInput;

        // First, delete existing tags
        await this.prisma.postTag.deleteMany({
            where: {
                posts: {
                    some: {
                        id,
                    },
                },
            },
        });

        // Then update the post with new data and tags
        const updatedPost = await this.prisma.post.update({
            where: { id },
            data: {
                ...postData,
                tags: {
                    create: tags?.map((tag: { name: string }) => ({
                        name: tag.name,
                    })),
                },
            },
            include: {
                user: true,
                tags: true,
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
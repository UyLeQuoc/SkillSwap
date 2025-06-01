import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsResolver } from "./posts.resolver";
import { PrismaService } from "../prisma/prisma.service";
import { MatchingModule } from "../matching/matching.module";

@Module({
    imports: [MatchingModule],
    providers: [PostsResolver, PostsService, PrismaService],
    exports: [PostsService],
})
export class PostsModule {} 
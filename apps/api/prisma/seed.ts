import { PrismaClient, PostType, PostStatus } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    // Create 2 regular users
    const users = await Promise.all([
        await prisma.user.create({
            data: {
                wallet: "0x994845a200c22d021eb08f97136a43fb04ea93fe27b1efbf8fd95f8a3034757b",
                name: "UyDev",
                bio: "Software Developer",
            },
        }),
        prisma.user.create({
            data: {
                wallet: "0xf8a4da3a751fba566508deb5166196ec5530602a924b3b0c132963e98188fb04",
                name: "Uy Slush",
                bio: "Software Developer with 5 years of experience",
            },
        }),
    ])

    // Create skill tags
    const tags = await Promise.all([
        prisma.postTag.create({ data: { name: "programming" } }),
        prisma.postTag.create({ data: { name: "web-development" } }),
        prisma.postTag.create({ data: { name: "english" } }),
        prisma.postTag.create({ data: { name: "teaching" } }),
        prisma.postTag.create({ data: { name: "design" } }),
        prisma.postTag.create({ data: { name: "ui-ux" } }),
        prisma.postTag.create({ data: { name: "typescript" } }),
        prisma.postTag.create({ data: { name: "react" } }),
    ])

    // Create posts - 2 for each user
    const posts = await Promise.all([
        // John's posts
        prisma.post.create({
            data: {
                userId: users[0].id,
                haveSkill: "Web Development",
                wantSkill: "English Speaking",
                description: "Experienced web developer looking to improve English speaking skills. Can teach React, Node.js, and TypeScript.",
                type: PostType.SKILL,
                status: PostStatus.ACTIVE,
                tags: {
                    connect: [
                        { name: "programming" },
                        { name: "web-development" },
                        { name: "typescript" },
                        { name: "react" },
                    ],
                },
            },
        }),
        prisma.post.create({
            data: {
                userId: users[0].id,
                haveSkill: "UI/UX Design",
                wantSkill: "English Teaching",
                description: "Professional UI/UX designer offering design lessons in exchange for English teaching.",
                type: PostType.SKILL,
                status: PostStatus.ACTIVE,
                tags: {
                    connect: [
                        { name: "design" },
                        { name: "ui-ux" },
                        { name: "teaching" },
                    ],
                },
            },
        }),

        // Jane's posts
        prisma.post.create({
            data: {
                userId: users[1].id,
                haveSkill: "English Teaching",
                wantSkill: "Web Development",
                description: "Certified English teacher offering personalized lessons. Looking to learn web development basics.",
                type: PostType.SKILL,
                status: PostStatus.ACTIVE,
                tags: {
                    connect: [
                        { name: "english" },
                        { name: "teaching" },
                        { name: "web-development" },
                    ],
                },
            },
        }),
        prisma.post.create({
            data: {
                userId: users[1].id,
                haveSkill: "English Speaking",
                wantSkill: "UI/UX Design",
                description: "Native English speaker offering conversation practice. Looking to learn UI/UX design.",
                type: PostType.SKILL,
                status: PostStatus.ACTIVE,
                tags: {
                    connect: [
                        { name: "english" },
                        { name: "teaching" },
                        { name: "design" },
                        { name: "ui-ux" },
                    ],
                },
            },
        }),
    ])

    // Create deals between the users
    const deals = await Promise.all([
        prisma.deal.create({
            data: {
                userAId: users[0].id,
                userBId: users[1].id,
                postAId: posts[0].id,
                postBId: posts[2].id,
                status: "PENDING",
                type: "SKILL_SWAP",
            },
        }),
        prisma.deal.create({
            data: {
                userAId: users[0].id,
                userBId: users[1].id,
                postAId: posts[1].id,
                postBId: posts[3].id,
                status: "AGREED",
                type: "SKILL_SWAP",
            },
        }),
    ])

    // Create reviews for completed deals
    const reviews = await Promise.all([
        prisma.review.create({
            data: {
                dealId: deals[1].id,
                reviewerId: users[0].id,
                revieweeId: users[1].id,
                rating: 5,
                comment: "Excellent English teacher! Very patient and knowledgeable.",
            },
        }),
        prisma.review.create({
            data: {
                dealId: deals[1].id,
                reviewerId: users[1].id,
                revieweeId: users[0].id,
                rating: 4,
                comment: "Great UI/UX design skills. Learned a lot!",
            },
        }),
    ])

    // Create skill badges for both users
    const skillBadges = await Promise.all([
        prisma.skillBadge.create({
            data: {
                userId: users[0].id,
                verifierId: users[0].id,
                skillName: "Web Development",
                suiObjectId: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
            },
        }),
        prisma.skillBadge.create({
            data: {
                userId: users[0].id,
                verifierId: users[0].id,
                skillName: "UI/UX Design",
                suiObjectId: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
            },
        }),
        prisma.skillBadge.create({
            data: {
                userId: users[1].id,
                verifierId: users[0].id,
                skillName: "English Teaching",
                suiObjectId: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
            },
        }),
        prisma.skillBadge.create({
            data: {
                userId: users[1].id,
                verifierId: users[0].id,
                skillName: "English Speaking",
                suiObjectId: "0x4567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123",
            },
        }),
    ])

    // Create matching suggestions
    const matchingSuggestions = await Promise.all([
        prisma.matchingSuggestion.create({
            data: {
                sourcePostId: posts[0].id,
                targetPostId: posts[2].id,
                method: "EXACT",
                score: 0.95,
            },
        }),
        prisma.matchingSuggestion.create({
            data: {
                sourcePostId: posts[1].id,
                targetPostId: posts[3].id,
                method: "EXACT",
                score: 0.92,
            },
        }),
    ])

    console.log("Seed data created:", {
        users,
        tags,
        posts,
        deals,
        reviews,
        skillBadges,
        matchingSuggestions,
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) 
import { PrismaClient, Roles, PostType, PostStatus } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    // Create admin user
    const admin = await prisma.user.create({
        data: {
            wallet: "0x994845a200c22d021eb08f97136a43fb04ea93fe27b1efbf8fd95f8a3034757b",
            name: "Admin User",
            bio: "Platform administrator",
            role: Roles.ADMIN,
            reputationScore: 5.0,
        },
    })

    // Create regular users
    const users = await Promise.all([
        prisma.user.create({
            data: {
                wallet: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
                name: "John Doe",
                bio: "Software Developer with 5 years of experience",
                role: Roles.CUSTOMER,
                reputationScore: 4.5,
            },
        }),
        prisma.user.create({
            data: {
                wallet: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
                name: "Jane Smith",
                bio: "English Teacher and Language Enthusiast",
                role: Roles.CUSTOMER,
                reputationScore: 4.8,
            },
        }),
        prisma.user.create({
            data: {
                wallet: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
                name: "Mike Johnson",
                bio: "Professional Guitarist and Music Producer",
                role: Roles.CUSTOMER,
                reputationScore: 4.2,
            },
        }),
    ])

    // Create skill tags
    const tags = await Promise.all([
        prisma.postTag.create({ data: { name: "programming" } }),
        prisma.postTag.create({ data: { name: "web-development" } }),
        prisma.postTag.create({ data: { name: "english" } }),
        prisma.postTag.create({ data: { name: "music" } }),
        prisma.postTag.create({ data: { name: "guitar" } }),
        prisma.postTag.create({ data: { name: "teaching" } }),
        prisma.postTag.create({ data: { name: "design" } }),
        prisma.postTag.create({ data: { name: "ui-ux" } }),
    ])

    // Create posts
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
                        { name: "english" },
                    ],
                },
            },
        }),
        prisma.post.create({
            data: {
                userId: users[0].id,
                haveSkill: "UI/UX Design",
                wantSkill: "Guitar Lessons",
                description: "Professional UI/UX designer offering design lessons in exchange for guitar lessons.",
                type: PostType.SKILL,
                status: PostStatus.ACTIVE,
                tags: {
                    connect: [
                        { name: "design" },
                        { name: "ui-ux" },
                        { name: "guitar" },
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

        // Mike's posts
        prisma.post.create({
            data: {
                userId: users[2].id,
                haveSkill: "Guitar Lessons",
                wantSkill: "UI/UX Design",
                description: "Professional guitarist offering lessons for beginners and intermediate players. Looking to learn UI/UX design.",
                type: PostType.SKILL,
                status: PostStatus.ACTIVE,
                tags: {
                    connect: [
                        { name: "music" },
                        { name: "guitar" },
                        { name: "teaching" },
                        { name: "design" },
                    ],
                },
            },
        }),
    ])

    // Create some deals
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
                userBId: users[2].id,
                postAId: posts[1].id,
                postBId: posts[3].id,
                status: "AGREED",
                type: "SKILL_SWAP",
            },
        }),
    ])

    // Create some reviews
    const reviews = await Promise.all([
        prisma.review.create({
            data: {
                dealId: deals[1].id,
                reviewerId: users[0].id,
                revieweeId: users[2].id,
                rating: 5,
                comment: "Great guitar teacher! Very patient and knowledgeable.",
            },
        }),
        prisma.review.create({
            data: {
                dealId: deals[1].id,
                reviewerId: users[2].id,
                revieweeId: users[0].id,
                rating: 4,
                comment: "Excellent UI/UX design skills. Learned a lot!",
            },
        }),
    ])

    // Create some skill badges
    const skillBadges = await Promise.all([
        prisma.skillBadge.create({
            data: {
                userId: users[0].id,
                verifierId: admin.id,
                skillName: "Web Development",
                suiObjectId: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
            },
        }),
        prisma.skillBadge.create({
            data: {
                userId: users[1].id,
                verifierId: admin.id,
                skillName: "English Teaching",
                suiObjectId: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
            },
        }),
        prisma.skillBadge.create({
            data: {
                userId: users[2].id,
                verifierId: admin.id,
                skillName: "Guitar",
                suiObjectId: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
            },
        }),
    ])

    console.log("Seed data created:", {
        admin,
        users,
        tags,
        posts,
        deals,
        reviews,
        skillBadges,
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
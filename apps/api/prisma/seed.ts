import { PrismaClient, Roles } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    // Create user
    const user = await prisma.user.create({
        data: {
            wallet: "0x994845a200c22d021eb08f97136a43fb04ea93fe27b1efbf8fd95f8a3034757b",
            name: "UyDev",
            bio: "IT Professional specializing in web design",
            role: Roles.ADMIN,
        },
    })

    // Create post for web design skill
    const post = await prisma.post.create({
        data: {
            userId: user.id,
            haveSkill: "Web Design",
            wantSkill: "English Speaking",
            description: "I can help with website design and development. Looking to improve my English speaking skills.",
            normalizedHave: "web design",
            normalizedWant: "english speaking",
            normalizedDesc: "i can help with website design and development looking to improve my english speaking skills",
            tags: {
                create: [
                    { name: "web-design" },
                    { name: "it" },
                    { name: "english" },
                ],
            },
        },
    })

    console.log("Seed data created:", { user, post })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) 
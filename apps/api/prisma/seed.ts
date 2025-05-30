import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    // Create admin user
    const admin = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {},
        create: {
            email: "admin@example.com",
            password: "admin123", // In production, this should be hashed
            role: "ADMIN",
        },
    })

    // Create customer user
    const customer = await prisma.user.upsert({
        where: { email: "customer@example.com" },
        update: {},
        create: {
            email: "customer@example.com",
            password: "customer123", // In production, this should be hashed
            role: "CUSTOMER",
        },
    })

    console.log({ admin, customer })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) 
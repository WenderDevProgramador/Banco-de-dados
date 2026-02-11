import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
    const post = await prisma.post.create({
        data: {
            title: "Post versão atual",
            content: "Criado com Prisma 7",
            published: true,
        },
    });

    console.log(post);
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });

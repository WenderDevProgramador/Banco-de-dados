const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



async function main() {
    await prisma.post.createMany({
        data: [
            {
                title: 'Olá, mundo!',
                content: 'Este é meu primeiro post usando Prisma.',
                published: true
            },

            {
                title: 'Prisma é incrível!',
                content: 'Estou adorando usar Prisma para gerenciar meu banco de dados.',
                published: true
            }
        ]
    })
}

main().then(async () => {
    await prisma.$disconnect()
})




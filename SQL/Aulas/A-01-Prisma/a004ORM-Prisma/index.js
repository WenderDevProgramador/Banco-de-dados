const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {

//     await prisma.post.create({
//         data: {
//             title: "Meu terceiro post",
//             content: "conteúdo novo",
//             slug: "post-7",
//             author: { connect: { email: "alice@example.com" } } // conecta ao usuário existente
//         }
//     })
// }


    await prisma.user.create({
        data: {
            name: "Alice",
            email: "alice@example.com",
            posts: {
                create: [
                    {
                        title: "My first post",
                        content: "lorem ipusun",
                        slug: "post 5"

                    },
                    {
                        title: "My second post",
                        content: "lorem ipsum dolor sit amet",
                        slug: "post 6"

                    },
                ],
            },

        }
    })

    const result = await prisma.user.findMany({
        include: {posts: true}
    })

    console.log(result, result[0].posts)
}

main()
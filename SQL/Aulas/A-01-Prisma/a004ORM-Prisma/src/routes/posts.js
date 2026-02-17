const { Router } = require('express');
const prisma = require('../database');

const router = Router()

router.get("/", async (req, res) => {
    const posts = await prisma.post.findMany({
        orderBy: {createdAt: "desc"},
    })
    res.json(posts);
})

router.post("/", async (req, res) => {
    const newPost = await prisma.post.create({
        data: {
            title: req.body.title,
            slug: req.body.slug,
            content: req.body.content,
            published: req.body.published,
            authorId: req.body.authorId
        }
    })
    res.status(201).json(newPost);
});

router.get("/:id", async (req, res) => {
    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {author: true}
    })
    res.json(post);
});

router.put("/:id", async (req, res) => {
    const { title, slug, content, published } = req.body;
    const updatedPost = await prisma.post.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            title,
            slug,
            content,
            published
        }
    })
    res.json(updatedPost);
});

router.delete("/:id", async (req, res) => {
        const deletedPost = await prisma.post.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    res.status(204).json({deletedPost});
});


module.exports = router;
const { Router } = require('express');
const prisma = require('../database');

const router = Router()

router.get("/", async (req, res) => {
    const page = +req.query.page || 1;
    const pageSize = +req.query.pageSize || 10;

    const posts = await prisma.post.findMany({
        orderBy: {createdAt: "desc"},
        take: pageSize,
        skip: (page - 1) * pageSize
    })
    const totalPosts = await prisma.post.count({where: {published: true}});
    const totalPages = Math.ceil(totalPosts / pageSize);

    res.json({
        posts,
        totalPosts,
        totalPages,
        page,
        pageSize
    });
})

router.get("/search", async (req, res) => {
    const { title, authorId, published, startDate, endDate} = req.query;

    const filter = {}

    if (title) {

        filter.title = {
            contains: title,
            mode: "insensitive"
        }

    }

    if(authorId) {
        filter.authorId = parseInt(authorId);
    }

    if(published) {
        filter.published = published === "true";
    }

    if(startDate || endDate) {
        filter.createdAt = {};
        if(startDate) {
            filter.createdAt.gte = new Date(startDate);
        }
        if(endDate) {
            filter.createdAt.lte = new Date(endDate);
        }

    }

    console.log("Filtro:",filter);


    const posts = await prisma.post.findMany({
        where: filter,
        orderBy: {createdAt: "desc"},
    })

    res.json(posts);
});

router.post("/", async (req, res) => {
    const newPost = await prisma.post.create({
        data: {
            title: req.body.title,
            slug: req.body.slug,
            content: req.body.content,
            published: req.body.published,
            authorId: req.body.authorId,
            tags: {
                connect: req.body.tags
            }
        }
    })
    res.status(201).json(newPost);
});

router.get("/:id", async (req, res) => {
    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            author: true,
            tags: true

        }
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
            ...req.body,
            tags: {
                set: req.body.tags
            }
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
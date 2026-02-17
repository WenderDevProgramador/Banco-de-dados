const express = require("express");
const userRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

const app = express();

app.use(express.json());
app.use("/api/users", userRouter);

app.use("/api/posts", postsRouter);


app.listen(3000, () => {
    console.log(`Servidor iniciado!`);
})
import cors from 'cors';
import express from 'express';
import { router } from './router.js';
import { errorHandlerMiddleware } from './middleaweres/error-handler.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(errorHandlerMiddleware);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

export { app };

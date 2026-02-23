import cors from 'cors';
import express from 'express';
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
export default app;
//# sourceMappingURL=server.js.map
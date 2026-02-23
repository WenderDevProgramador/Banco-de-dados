import { Router } from 'express';
import { HttpError } from './errors/HttpError.js';

const router = Router();

router.get("/test",async (req, res, next) => {
    try {
        throw new HttpError(401,"Não autorizado");
        res.json({ message: "Rota de teste funcionando!" });
    } catch (error) {
        next(error);
    }
});

export  {router};
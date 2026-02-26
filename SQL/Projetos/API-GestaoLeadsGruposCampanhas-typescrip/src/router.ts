import { Router } from 'express';
import { HttpError } from './errors/HttpError.js';
import { LeadsController } from './controllers/LeadsController.js';

const router = Router();

const leadsController = new LeadsController();

router.get('/leads', leadsController.index);

router.get("/status",async (req, res, next) => {
    try {
        
        res.json({ message: "OK!" });
    } catch (error) {
        next(error);
    }
});

export  {router};
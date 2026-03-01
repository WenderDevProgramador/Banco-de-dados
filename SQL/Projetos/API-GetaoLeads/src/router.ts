import {Router} from 'express';
import { HttpError } from './errors/HttpError.js';

export const router = Router();

router.get('/status', async (req, res, next) => {

    try {
            
        res.json({message: 'STATUS - API: ONLINE!'});
    } catch (error) {
        next(error);
    }
    
});


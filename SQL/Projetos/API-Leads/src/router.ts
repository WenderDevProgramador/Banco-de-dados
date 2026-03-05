import { Router } from "express"
import { LeadsController } from "./controllers/LeadsController.js";

const router = Router()

const leadsController = new LeadsController()

router.get("/leads", leadsController.index)
router.post("/leads", leadsController.create)

router.get("/status", async (req, res, next) => {
    try {
        res.json({ message: 'API - Status: ONLINE' });
    } catch (error) {
        next(error)
    }
})

export { router }


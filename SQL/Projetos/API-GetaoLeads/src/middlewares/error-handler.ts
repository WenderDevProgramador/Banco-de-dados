import type { ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError.js";

export const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof HttpError) {

        res.status(error.status).json({ error: error.message });

    } else if (error instanceof Error) {

        res.status(500).json({ error: error.message });
    } else {


        res.status(500).json({ error: "Internal Server Error" });
    }


};
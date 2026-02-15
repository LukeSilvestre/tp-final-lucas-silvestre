// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Error interno del servidor';

    logger.error(`Error en ${req.method} ${req.path}: ${message}`, err);

    res.status(status).json({
        error: message,
        status,
        detalle: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

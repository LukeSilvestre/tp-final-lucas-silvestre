import { Request, Response, NextFunction } from 'express';
import * as veterinarioModel from '../models/veterinario.model';

/**
 * Obtiene la lista de todos los veterinarios registrados.
 */
export const obtenerTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const veterinarios = await veterinarioModel.getAllVeterinarios();
        res.json(veterinarios);
    } catch (error) {
        next(error);
    }
};

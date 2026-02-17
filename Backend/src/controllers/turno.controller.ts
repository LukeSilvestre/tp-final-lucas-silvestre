import { Request, Response, NextFunction } from 'express';
import * as turnoService from '../services/turno.service';
import { validationResult } from 'express-validator';

/**
 * Obtiene los turnos (Filtrados por veterinario o todos si es Admin).
 */
export const obtenerTurnos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rol = req.usuario!.rol;
        const usuarioId = req.usuario!.id;

        const turnos = await turnoService.obtenerTurnos(rol, usuarioId);

        res.json({
            cantidad: turnos.length,
            turnos: turnos
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Crea un nuevo turno.
 */
export const crearTurno = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const nuevoId = await turnoService.crearTurno(req.body);

        res.status(201).json({
            id: nuevoId,
            mensaje: 'Turno creado exitosamente'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Actualiza un turno existente.
 */
export const actualizarTurno = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const seActualizo = await turnoService.actualizarTurno(id, req.body);

        if (!seActualizo) {
            return res.status(404).json({ error: 'Turno no encontrado' });
        }

        res.json({ mensaje: 'Turno actualizado exitosamente', id });
    } catch (error) {
        next(error);
    }
};

/**
 * Elimina un turno.
 */
export const eliminarTurno = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);

        const seElimino = await turnoService.eliminarTurno(id);

        if (!seElimino) {
            return res.status(404).json({ error: 'Turno no encontrado' });
        }

        res.json({ mensaje: 'Turno eliminado exitosamente', id });
    } catch (error) {
        next(error);
    }
};

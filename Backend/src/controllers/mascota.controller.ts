// src/controllers/mascota.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as mascotaService from '../services/mascota.service';
import { validationResult } from 'express-validator';

/**
 * Obtiene la lista completa de mascotas.
 */
export const obtenerMascotas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rol = req.usuario!.rol;
        const usuarioId = req.usuario!.id;
        const mascotas = await mascotaService.obtenerTodasLasMascotas(rol, usuarioId);
        res.json({ cantidad: mascotas.length, mascotas });
    } catch (error) {
        next(error);
    }
};

/**
 * Obtiene una sola mascota por su ID.
 */
export const obtenerMascotaPorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        const rol = req.usuario!.rol;
        const usuarioId = req.usuario!.id;

        const mascota = await mascotaService.obtenerMascotaPorId(id, rol, usuarioId);

        if (!mascota) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }

        res.json(mascota);
    } catch (error) {
        next(error);
    }
};

/**
 * Lista todas las mascotas de un dueño en especial.
 */
export const obtenerMascotasPorDuenio = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const duenioId = parseInt(req.params.duenioId as string);
        // Nota: findByDuenioId sigue en el modelo, podríamos moverla a service si hay lógica de filtrado extra
        // Por ahora, asumimos que si el vet tiene el ID del dueño es porque puede verlo
        const mascotas = await mascotaService.obtenerTodasLasMascotas(req.usuario!.rol, req.usuario!.id);
        const filtradas = mascotas.filter(m => m.id_duenio === duenioId);

        res.json({ cantidad: filtradas.length, mascotas: filtradas });
    } catch (error) {
        next(error);
    }
};

/**
 * Crea una nueva mascota vinculada al usuario logueado.
 */
export const crearMascota = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const usuarioId = req.usuario!.id;
        const nuevoId = await mascotaService.crearMascota(req.body, usuarioId);

        res.status(201).json({ id: nuevoId, mensaje: 'Mascota creada exitosamente' });
    } catch (error) {
        next(error);
    }
};

/**
 * Actualiza los datos de una mascota.
 */
export const actualizarMascota = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        const rol = req.usuario!.rol;
        const usuarioId = req.usuario!.id;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const actualizado = await mascotaService.actualizarMascota(id, req.body, rol, usuarioId);

        if (!actualizado) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }

        res.json({ mensaje: 'Mascota actualizada', id });
    } catch (error) {
        next(error);
    }
};

/**
 * Elimina una mascota (Solo Admin).
 */
export const eliminarMascota = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        const eliminado = await mascotaService.eliminarMascota(id);

        if (!eliminado) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }

        res.json({ mensaje: 'Mascota eliminada', id });
    } catch (error) {
        next(error);
    }
};

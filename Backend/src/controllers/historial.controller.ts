import { Request, Response, NextFunction } from 'express';
import * as historialService from '../services/historial.service';
import { validationResult } from 'express-validator';

export const obtenerHistoriales = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rol = req.usuario!.rol;
    const usuarioId = req.usuario!.id;

    const historiales = await historialService.obtenerHistoriales(rol, usuarioId);

    res.json({
      cantidad: historiales.length,
      historiales: historiales
    });
  } catch (error) {
    next(error);
  }
};

export const obtenerHistorialPorId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const rol = req.usuario!.rol;
    const usuarioId = req.usuario!.id;

    const historial = await historialService.obtenerHistorialPorId(id, rol, usuarioId);

    if (!historial) {
      return res.status(404).json({ error: 'Historial no encontrado' });
    }

    res.json(historial);
  } catch (error) {
    next(error);
  }
};

export const crearHistorial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const usuarioId = req.usuario!.id;
    const nuevoId = await historialService.crearHistorial(req.body, usuarioId);

    res.status(201).json({
      id: nuevoId,
      mensaje: 'Historial clínico creado exitosamente'
    });
  } catch (error) {
    next(error);
  }
};

export const actualizarHistorial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const rol = req.usuario!.rol;
    const usuarioId = req.usuario!.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const seActualizo = await historialService.actualizarHistorial(id, req.body, rol, usuarioId);

    if (!seActualizo) {
      return res.status(404).json({ error: 'Historial no encontrado' });
    }

    res.json({ mensaje: 'Historial actualizado exitosamente', id });
  } catch (error) {
    next(error);
  }
};

export const eliminarHistorial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const rol = req.usuario!.rol;
    const usuarioId = req.usuario!.id;

    const seElimino = await historialService.eliminarHistorial(id, rol, usuarioId);

    if (!seElimino) {
      return res.status(404).json({ error: 'Historial no encontrado' });
    }

    res.json({ mensaje: 'Historial eliminado exitosamente', id });
  } catch (error) {
    next(error);
  }
};
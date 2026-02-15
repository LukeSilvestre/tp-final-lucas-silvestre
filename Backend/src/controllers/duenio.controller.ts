// src/controllers/duenio.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as duenioService from '../services/duenio.service';
import { validationResult } from 'express-validator';

export const obtenerDuenios = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const duenios = await duenioService.obtenerTodosLosDuenios();
    res.json({ cantidad: duenios.length, duenios });
  } catch (error) {
    next(error);
  }
};

export const obtenerDuenioPorId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const duenio = await duenioService.obtenerDuenioPorId(id);

    if (!duenio) {
      return res.status(404).json({ error: 'Dueño no encontrado' });
    }

    res.json(duenio);
  } catch (error) {
    next(error);
  }
};

export const crearDuenio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const nuevoId = await duenioService.crearDuenio(req.body);
    res.status(201).json({ id: nuevoId, mensaje: 'Dueño creado exitosamente' });
  } catch (error) {
    next(error);
  }
};

export const actualizarDuenio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const actualizado = await duenioService.actualizarDuenio(id, req.body);

    if (!actualizado) {
      return res.status(404).json({ error: 'Dueño no encontrado' });
    }

    res.json({ mensaje: 'Dueño actualizado', id });
  } catch (error) {
    next(error);
  }
};

export const eliminarDuenio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string);
    const eliminado = await duenioService.eliminarDuenio(id);

    if (!eliminado) {
      return res.status(404).json({ error: 'Dueño no encontrado' });
    }

    res.json({ mensaje: 'Dueño eliminado', id });
  } catch (error) {
    next(error);
  }
};

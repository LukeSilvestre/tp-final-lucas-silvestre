// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { validationResult } from 'express-validator';

export const registrar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const usuarioId = await authService.registrarUsuario(req.body);
    res.status(201).json({ id: usuarioId, mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const respuesta = await authService.iniciarSesion(req.body);
    res.json(respuesta);
  } catch (error) {
    next(error);
  }
};

export const obtenerPerfil = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.usuario) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }
    res.json({ usuario: req.usuario, mensaje: 'Perfil obtenido exitosamente' });
  } catch (error) {
    next(error);
  }
};

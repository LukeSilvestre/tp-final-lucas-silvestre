
import { body, param } from 'express-validator';

export const crearDuenioValidator = [
  body('nombre').notEmpty().trim().isLength({ max: 50 }),
  body('apellido').notEmpty().trim().isLength({ max: 50 }),
  body('telefono').notEmpty().trim().isLength({ max: 20 }),
  body('direccion').optional().trim().isLength({ max: 100 })
];

export const actualizarDuenioValidator = [
  param('id').isInt({ min: 1 }),
  body('nombre').optional().trim().isLength({ max: 50 }),
  body('apellido').optional().trim().isLength({ max: 50 }),
  body('telefono').optional().trim().isLength({ max: 20 }),
  body('direccion').optional().trim().isLength({ max: 100 })
];
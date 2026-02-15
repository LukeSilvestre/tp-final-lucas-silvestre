import { body, param } from 'express-validator';

export const crearHistorialValidator = [
  body('id_mascota').isInt({ min: 1 }),
  body('tipo_consulta').notEmpty().trim().isLength({ max: 50 }),
  body('descripcion').notEmpty().trim().isLength({ max: 250 })
];

export const actualizarHistorialValidator = [
  param('id').isInt({ min: 1 }),
  body('descripcion').optional().trim().isLength({ max: 250 })
];
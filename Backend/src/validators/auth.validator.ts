import { body } from 'express-validator';

export const registrarValidator = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('nombre').notEmpty().trim(),
  body('apellido').notEmpty().trim(),
  body('rol').optional().isIn(['admin', 'veterinario']),
  body('matricula').if(body('rol').equals('veterinario')).notEmpty().trim(),
  body('especialidad').if(body('rol').equals('veterinario')).notEmpty().trim()
];

export const loginValidator = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];
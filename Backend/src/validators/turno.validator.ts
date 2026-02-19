import { body } from 'express-validator';

export const crearTurnoValidator = [
    body('id_mascota').isInt({ min: 1 }).withMessage('ID de mascota inválido'),
    body('id_veterinario').isInt({ min: 1 }).withMessage('ID de veterinario inválido'),
    body('fecha')
        .isISO8601()
        .withMessage('Fecha inválida (usar formato YYYY-MM-DD)'),
    body('hora')
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/)
        .withMessage('Hora inválida (usar formato HH:MM)'),
    body('motivo').optional().trim().isLength({ max: 255 }),
];

export const actualizarTurnoValidator = [
    body('fecha')
        .optional()
        .isISO8601()
        .withMessage('Fecha inválida (usar formato YYYY-MM-DD)'),
    body('hora')
        .optional()
        .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/)
        .withMessage('Hora inválida (usar formato HH:MM)'),
    body('motivo').optional().trim().isLength({ max: 255 }),
    body('estado')
        .optional()
        .isIn(['Pendiente', 'Realizado', 'Cancelado'])
        .withMessage('Estado inválido'),
];

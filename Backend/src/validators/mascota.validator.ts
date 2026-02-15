import { body } from 'express-validator';

/**
 * Reglas de validación para CREAR una mascota.
 * El nombre, especie e id_duenio son requeridos (notEmpty).
 */
export const crearMascotaValidator = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio').isString().withMessage('El nombre debe ser un texto'),
    body('especie').notEmpty().withMessage('La especie es obligatoria').isString().withMessage('La especie debe ser un texto'),
    body('fecha_nacimiento').optional({ nullable: true }).isISO8601().withMessage('La fecha debe tener un formato válido (YYYY-MM-DD)'),
    body('id_duenio').notEmpty().withMessage('El ID del dueño es obligatorio').isInt().withMessage('El ID del dueño debe ser un número entero')
];

/**
 * Reglas de validación para ACTUALIZAR una mascota.
 * Aquí los campos son opcionales (.optional), ya que un PATCH
 * puede enviar solo uno o algunos de los campos para modificar.
 */
export const actualizarMascotaValidator = [
    body('nombre').optional().isString().withMessage('El nombre debe ser un texto'),
    body('especie').optional().isString().withMessage('La especie debe ser un texto'),
    body('fecha_nacimiento').optional({ nullable: true }).isISO8601().withMessage('La fecha debe tener un formato válido (YYYY-MM-DD)'),
    body('id_duenio').optional().isInt().withMessage('El ID del dueño debe ser un número entero')
];

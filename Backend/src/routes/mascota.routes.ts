// src/routes/mascota.routes.ts
import { Router } from 'express';
import {
    obtenerMascotas,
    obtenerMascotaPorId,
    obtenerMascotasPorDuenio,
    crearMascota,
    actualizarMascota,
    eliminarMascota
} from '../controllers/mascota.controller';
import { verificarToken, verificarRol } from '../middlewares/auth.middleware';
import { crearMascotaValidator, actualizarMascotaValidator } from '../validators/mascota.validator';

const router = Router();

/**
 * Middleware de Autenticación:
 * Todas las rutas definidas abajo de esta línea requerirán que el usuario
 * esté logueado y envíe un token JWT válido.
 */
router.use(verificarToken);

// GET /api/mascotas - Lista todas las mascotas para consulta general
router.get('/', obtenerMascotas);

// GET /api/mascotas/:id - Obtiene el detalle de una mascota puntual
router.get('/:id', obtenerMascotaPorId);

// GET /api/mascotas/duenio/:duenioId - Busca mascotas que pertenezcan a un dueño específico
router.get('/duenio/:duenioId', obtenerMascotasPorDuenio);

/**
 * Rutas de Modificación:
 * Usamos 'verificarRol(['admin'])' para asegurar que solo los administradores
 * puedan crear, editar o borrar mascotas.
 */

// POST /api/mascotas - Crea un nuevo registro de mascota
router.post('/', verificarRol(['admin', 'veterinario']), crearMascotaValidator, crearMascota);

// PATCH /api/mascotas/:id - Actualiza parcialmente los datos de una mascota
router.patch('/:id', verificarRol(['admin', 'veterinario']), actualizarMascotaValidator, actualizarMascota);

// DELETE /api/mascotas/:id - Borra permanentemente una mascota del sistema
router.delete('/:id', verificarRol(['admin']), eliminarMascota);

export default router;

// src/routes/duenio.routes.ts
import { Router } from 'express';
import {
  obtenerDuenios,
  obtenerDuenioPorId,
  crearDuenio,
  actualizarDuenio,
  eliminarDuenio
} from '../controllers/duenio.controller';
import { verificarToken, verificarRol } from '../middlewares/auth.middleware';
import { crearDuenioValidator, actualizarDuenioValidator } from '../validators/duenio.validator';

const router = Router();

// Todas las rutas requieren autenticación
router.use(verificarToken);

// GET /api/duenios - Listar dueños
router.get('/', obtenerDuenios);

// GET /api/duenios/:id - Obtener dueño específico
router.get('/:id', obtenerDuenioPorId);

// POST /api/duenios - Crear dueño (admin o veterinario)
router.post('/', verificarRol(['admin', 'veterinario']), crearDuenioValidator, crearDuenio);

// PATCH /api/duenios/:id - Actualizar dueño (admin o veterinario)
router.patch('/:id', verificarRol(['admin', 'veterinario']), actualizarDuenioValidator, actualizarDuenio);

// DELETE /api/duenios/:id - Eliminar dueño (solo admin)
router.delete('/:id', verificarRol(['admin']), eliminarDuenio);

export default router;
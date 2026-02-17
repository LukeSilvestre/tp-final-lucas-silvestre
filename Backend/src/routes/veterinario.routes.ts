import { Router } from 'express';
import * as veterinarioController from '../controllers/veterinario.controller';
import { verificarToken } from '../middlewares/auth.middleware';

const router = Router();

/**
 * Endpoint para obtener la lista de veterinarios.
 * Se requiere estar autenticado para consultar la lista de profesionales.
 */
router.get('/', verificarToken, veterinarioController.obtenerTodos);

export default router;

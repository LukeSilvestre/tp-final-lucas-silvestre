import { Router } from 'express';
import { 
  obtenerHistoriales, 
  obtenerHistorialPorId, 
  crearHistorial, 
  actualizarHistorial, 
  eliminarHistorial 
} from '../controllers/historial.controller';
import { verificarToken, verificarRol } from '../middlewares/auth.middleware';
import { crearHistorialValidator, actualizarHistorialValidator } from '../validators/historial.validator';

const router = Router();

// TODAS las rutas requieren autenticación
router.use(verificarToken);

// GET /api/historial - Listar historiales (veterinario ve solo los suyos, admin ve todos)
router.get('/', obtenerHistoriales);

// GET /api/historial/:id - Obtener historial específico
router.get('/:id', obtenerHistorialPorId);

// POST /api/historial - Crear nuevo historial (solo veterinarios)
router.post('/', crearHistorialValidator, crearHistorial);

// PATCH /api/historial/:id - Actualizar historial (veterinario solo los suyos, admin cualquiera)
router.patch('/:id', actualizarHistorialValidator, actualizarHistorial);

// DELETE /api/historial/:id - Eliminar historial (veterinario solo los suyos, admin cualquiera)
router.delete('/:id', eliminarHistorial);

export default router;
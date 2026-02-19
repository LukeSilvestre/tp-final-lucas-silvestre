import { Router } from 'express';
import * as turnoController from '../controllers/turno.controller';
import { verificarToken } from '../middlewares/auth.middleware';
import { crearTurnoValidator, actualizarTurnoValidator } from '../validators/turno.validator';

const router = Router();

/**
 * Todas las rutas de turnos requieren autenticación
 */
router.use(verificarToken);

// Listar turnos (Admin ve todos, Veterinario solo los suyos)
router.get('/', turnoController.obtenerTurnos);

// Crear nuevo turno
router.post('/', crearTurnoValidator, turnoController.crearTurno);

// Actualizar turno
router.patch('/:id', actualizarTurnoValidator, turnoController.actualizarTurno);

// Eliminar/Cancelar turno
router.delete('/:id', turnoController.eliminarTurno);

export default router;

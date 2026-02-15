import { Router } from 'express';
import { registrar, login, obtenerPerfil } from '../controllers/auth.controller';
import { verificarToken, verificarRol } from '../middlewares/auth.middleware';
import { registrarValidator, loginValidator } from '../validators/auth.validator';


const router = Router();

// Ruta pública para Login
router.post('/login', loginValidator, login);

// Ruta protegida para Registrar (Solo Admin)
router.post('/registrar', verificarToken, verificarRol(['admin']), registrarValidator, registrar);

// Obtener perfil del usuario logueado
router.get('/perfil', verificarToken, obtenerPerfil);

export default router;
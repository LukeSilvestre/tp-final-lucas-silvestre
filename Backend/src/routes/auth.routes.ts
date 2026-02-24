import { Router } from 'express';
import { registrar, login, obtenerPerfil } from '../controllers/auth.controller';
import { verificarToken, verificarRol } from '../middlewares/auth.middleware';
import { registrarValidator, loginValidator } from '../validators/auth.validator';


const router = Router();

// Ruta pública para Login
router.post('/login', loginValidator, login);

// Ruta para Registrar (Pública, pero si hay Admin logueado puede asignar roles)
router.post('/registrar', (req: any, res: any, next: any) => {
    // Si hay un token en el header, intento verificarlo para identificar al admin
    if (req.headers.authorization) {
        return verificarToken(req, res, next);
    }
    // Si no hay token, simplemente sigo (el controlador forzará el rol a veterinario)
    next();
}, registrarValidator, registrar);

// Obtener perfil del usuario logueado
router.get('/perfil', verificarToken, obtenerPerfil);

export default router;
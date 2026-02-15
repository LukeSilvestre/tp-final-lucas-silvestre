import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/auth';

const JWT_SECRET = process.env.JWT_SECRET as string;

// Middleware para verificar token JWT
export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
  const headerAutorizacion = req.headers.authorization;
  
  if (!headerAutorizacion) {
    return res.status(401).json({ error: 'No se proporcionó token de autenticación' });
  }
  
  // El formato es: "Bearer TOKEN_JWT"
  const partes = headerAutorizacion.split(' ');
  
  if (partes.length !== 2 || partes[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }
  
  const token = partes[1];
  
  try {
    const datosVerificados = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.usuario = datosVerificados; // Agregar usuario al request
    next(); // Continuar al siguiente middleware/controlador
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

// Middleware para verificar roles
export const verificarRol = (rolesPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }
    
    const rolUsuario = req.usuario.rol;
    
    if (!rolesPermitidos.includes(rolUsuario)) {
      return res.status(403).json({ 
        error: 'Acceso denegado', 
        detalle: `Se requiere uno de estos roles: ${rolesPermitidos.join(', ')}` 
      });
    }
    
    next();
  };
};
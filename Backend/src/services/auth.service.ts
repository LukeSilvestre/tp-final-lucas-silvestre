import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as usuarioModel from '../models/usuario.model';
import * as veterinarioModel from '../models/veterinario.model';
import { CreateUsuarioDTO, LoginDTO, JwtPayload, LoginResponseDTO } from '../types/auth';
import { toResponseDTO } from '../models/usuario.model';

const JWT_SECRET = process.env.JWT_SECRET as string;

// Registrar nuevo usuario (solo admin puede hacer esto)
/**
 * Servicio para registrar un usuario y, si corresponde, su perfil de veterinario.
 * Nota cómo uso 'bcrypt' para hashear la contraseña. 
 */
export const registrarUsuario = async (dto: CreateUsuarioDTO): Promise<number> => {
  const passwordHasheado = await bcrypt.hash(dto.password, 10);

  // 1. Crear usuario en la tabla general (usuarios)
  const usuarioId = await usuarioModel.createUsuario({
    email: dto.email,
    password: passwordHasheado,
    nombre: dto.nombre,
    apellido: dto.apellido,
    rol: dto.rol || 'veterinario'
  });

  // 2. Si el rol es 'veterinario', creamos también su registro profesional
  if (dto.rol === 'veterinario') {
    const matricula = dto.matricula || `VET-${Date.now()}`;
    const especialidad = dto.especialidad || 'General';

    await veterinarioModel.crearVeterinario({
      nombre: dto.nombre,
      apellido: dto.apellido,
      matricula,
      especialidad,
      usuario_id: usuarioId
    });
  }

  return usuarioId;
};

// Iniciar sesión y generar token
export const iniciarSesion = async (dto: LoginDTO): Promise<LoginResponseDTO> => {
  console.log('🔐 Login attempt for:', dto.email);
  // Verificar credenciales
  const usuario = await usuarioModel.verifyCredentials(dto);

  if (!usuario) {
    console.log('❌ Usuario no encontrado o verifyCredentials falló');
    throw new Error('Email o contraseña incorrectos');
  }

  console.log('✅ Usuario encontrado:', usuario.email);
  console.log('🔐 Hash en BD:', usuario.password_hash.substring(0, 30) + '...');

  // Crear payload para el token JWT (la "carga útil" que viaja en el token)
  const payload: JwtPayload = {
    id: usuario.id,
    email: usuario.email,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    rol: usuario.rol
  };

  // Opciones de configuración del token
  const opcionesToken: jwt.SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || '1h',
    issuer: 'veterinaria-patitas-felices'
  };

  // Generar token - asegurar que payload es objeto porque me generó problemas con que tenía que ser objeto y no string
  const token = jwt.sign(payload as object, JWT_SECRET, opcionesToken);

  // Crear respuesta
  const respuesta: LoginResponseDTO = {
    token: token,
    usuario: toResponseDTO(usuario)
  };

  return respuesta;
};
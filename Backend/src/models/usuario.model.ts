import pool from '../config/database';
import bcrypt from 'bcrypt';
import { Usuario } from '../types/usuario';
import { LoginDTO, CreateUsuarioDTO } from '../types/auth';  // Los DTOs ahora están en auth
import { UsuarioResponseDTO } from '../types/usuario';  // Este SÍ debe estar en usuario.ts

// Buscar usuario por email
export const findUsuarioByEmail = async (email: string): Promise<Usuario | null> => {
  const [rows] = await pool.execute(
    'SELECT * FROM usuarios WHERE email = ?',
    [email]
  );
  
  const usuarios = rows as Usuario[];
  return usuarios.length > 0 ? usuarios[0] : null;
};

// Buscar usuario por ID
export const findUsuarioById = async (id: number): Promise<Usuario | null> => {
  const [rows] = await pool.execute(
    'SELECT * FROM usuarios WHERE id = ?',
    [id]
  );
  
  const usuarios = rows as Usuario[];
  return usuarios.length > 0 ? usuarios[0] : null;
};

// Crear nuevo usuario (para registro)
export const createUsuario = async (dto: {
  email: string;
  password: string;  // Este ya viene HASHEADO
  nombre: string;
  apellido: string;
  rol?: string;
}): Promise<number> => {
  
  const rolParaBD = (dto.rol === 'admin' || dto.rol === 'veterinario') 
    ? dto.rol 
    : 'veterinario';
  
  const [result] = await pool.execute(
    `INSERT INTO usuarios (email, password_hash, nombre, apellido, rol) 
     VALUES (?, ?, ?, ?, ?)`,
    [dto.email, dto.password, dto.nombre, dto.apellido, rolParaBD]
  );
  
  return (result as any).insertId;
};

// Verificar credenciales (para login)
export const verifyCredentials = async (dto: LoginDTO): Promise<Usuario | null> => {
  const usuario = await findUsuarioByEmail(dto.email);
  
  if (!usuario) {
    return null;
  }
  
  const isValid = await bcrypt.compare(dto.password, usuario.password_hash);
  return isValid ? usuario : null;
};

// Convertir Usuario a DTO de respuesta (sin password) para que pueda ser enviada al futuro Frontend
export const toResponseDTO = (usuario: Usuario): UsuarioResponseDTO => {
  return {
    id: usuario.id,
    email: usuario.email,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    rol: usuario.rol,
    created_at: usuario.created_at
  };
};
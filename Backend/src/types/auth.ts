import { UserRole } from './usuario';

// Payload que va dentro del token JWT
export interface JwtPayload {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: UserRole;
}

// Respuesta del login (token + info usuario)
export interface LoginResponseDTO {
  token: string;
  usuario: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
    rol: UserRole;
  };
}

// DTO para login (lo que recibe la API)
export interface LoginDTO {
  email: string;
  password: string;
}

// DTO para registro (lo que recibe la API)
export interface CreateUsuarioDTO {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  rol?: string | UserRole;
  matricula?: string;      
  especialidad?: string;   
}
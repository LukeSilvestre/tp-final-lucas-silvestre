export enum UserRole {
  ADMIN = 'admin',
  VETERINARIO = 'veterinario'
}

export interface Usuario {
  id: number;
  email: string;
  password_hash: string;
  nombre: string;
  apellido: string;
  rol: UserRole;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUsuarioDTO {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  rol?: UserRole;
}

export interface UsuarioResponseDTO {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  rol: UserRole;
  created_at: Date;
}
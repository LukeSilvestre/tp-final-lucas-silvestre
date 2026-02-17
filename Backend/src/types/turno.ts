export type EstadoTurno = 'Pendiente' | 'Realizado' | 'Cancelado';

export interface Turno {
    id: number;
    id_mascota: number;
    id_veterinario: number;
    fecha: string; // ISO Date YYYY-MM-DD
    hora: string;  // HH:MM:SS
    motivo: string | null;
    estado: EstadoTurno;
    created_at?: string;
}

export interface CreateTurnoDTO {
    id_mascota: number;
    id_veterinario: number;
    fecha: string;
    hora: string;
    motivo?: string;
}

export interface UpdateTurnoDTO {
    fecha?: string;
    hora?: string;
    motivo?: string;
    estado?: EstadoTurno;
}

export interface TurnoResponseDTO extends Turno {
    mascota_nombre: string;
    duenio_nombre: string;
    veterinario_nombre: string;
}

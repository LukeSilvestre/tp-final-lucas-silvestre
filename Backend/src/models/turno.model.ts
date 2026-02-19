import pool from '../config/database';
import {
    Turno,
    CreateTurnoDTO,
    UpdateTurnoDTO,
    TurnoResponseDTO
} from '../types/turno';

/**
 * Obtiene los turnos filtrados por el ID de usuario del veterinario.
 */
export const getTurnosByUsuario = async (usuarioId: number): Promise<TurnoResponseDTO[]> => {
    const [rows] = await pool.execute(
        `SELECT t.*, m.nombre as mascota_nombre, d.nombre as duenio_nombre, v.nombre as veterinario_nombre
     FROM turnos t
     JOIN mascotas m ON t.id_mascota = m.id
     JOIN duenios d ON m.id_duenio = d.id
     JOIN veterinarios v ON t.id_veterinario = v.id
     WHERE v.usuario_id = ?
     ORDER BY t.fecha ASC, t.hora ASC`,
        [usuarioId]
    );
    return rows as TurnoResponseDTO[];
};

/**
 * Obtiene todos los turnos (Uso exclusivo del Administrador).
 */
export const getAllTurnos = async (): Promise<TurnoResponseDTO[]> => {
    const [rows] = await pool.execute(
        `SELECT t.*, m.nombre as mascota_nombre, d.nombre as duenio_nombre, v.nombre as veterinario_nombre
     FROM turnos t
     JOIN mascotas m ON t.id_mascota = m.id
     JOIN duenios d ON m.id_duenio = d.id
     JOIN veterinarios v ON t.id_veterinario = v.id
     ORDER BY t.fecha ASC, t.hora ASC`
    );
    return rows as TurnoResponseDTO[];
};

/**
 * Crea un nuevo turno.
 */
export const createTurno = async (datos: CreateTurnoDTO): Promise<number> => {
    const [resultado] = await pool.execute(
        `INSERT INTO turnos (id_mascota, id_veterinario, fecha, hora, motivo)
     VALUES (?, ?, ?, ?, ?)`,
        [datos.id_mascota, datos.id_veterinario, datos.fecha, datos.hora, datos.motivo || null]
    );
    return (resultado as any).insertId;
};

/**
 * Actualiza un turno existente.
 */
export const updateTurno = async (id: number, datos: UpdateTurnoDTO): Promise<boolean> => {
    const [resultado] = await pool.execute(
        // Si no se envía fecha, se mantiene la original ( para eso es COALESCE)
        // Si no se envía hora, se mantiene la original ( para eso es COALESCE)
        // Si no se envía motivo, se mantiene el original ( para eso es COALESCE)
        // Si no se envía estado, se mantiene el original ( para eso es COALESCE)
        `UPDATE turnos 
     SET fecha = COALESCE(?, fecha), 
         hora = COALESCE(?, hora), 
         motivo = COALESCE(?, motivo), 
         estado = COALESCE(?, estado) 
     WHERE id = ?`,
        [datos.fecha || null, datos.hora || null, datos.motivo || null, datos.estado || null, id]
    );
    return (resultado as any).affectedRows > 0;
};

/**
 * Elimina un turno.
 */
export const deleteTurno = async (id: number): Promise<boolean> => {
    const [resultado] = await pool.execute('DELETE FROM turnos WHERE id = ?', [id]);
    return (resultado as any).affectedRows > 0;
};

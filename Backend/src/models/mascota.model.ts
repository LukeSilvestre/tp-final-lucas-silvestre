import pool from '../config/database';
import { Mascota } from '../types/mascota';

/**
 * Obtiene todas las mascotas registradas en la base de datos.
 * @returns Una lista (Array) de objetos Mascota.
 */
export const findAll = async (): Promise<Mascota[]> => {
    const [rows] = await pool.execute('SELECT * FROM mascotas');
    return rows as Mascota[];
};

/**
 * Busca una mascota específica por su ID.
 * @param id El identificador único de la mascota.
 * @returns El objeto Mascota si existe, o null si no se encuentra.
 */
export const findById = async (id: number): Promise<Mascota | null> => {
    const [rows] = await pool.execute(
        'SELECT * FROM mascotas WHERE id = ?',
        [id]
    );
    const mascotas = rows as Mascota[];
    return mascotas.length > 0 ? mascotas[0] : null;
};

/**
 * Obtiene todas las mascotas registradas por un usuario específico (Veterinario).
 */
export const findByUsuarioId = async (usuarioId: number): Promise<Mascota[]> => {
    const [rows] = await pool.execute(
        'SELECT * FROM mascotas WHERE usuario_id = ?',
        [usuarioId]
    );
    return rows as Mascota[];
};

/**
 * Obtiene todas las mascotas que pertenecen a un dueño específico.
 * @param id_duenio El ID del dueño.
 * @returns Un array con las mascotas del dueño.
 */
export const findByDuenioId = async (id_duenio: number): Promise<Mascota[]> => {
    const [rows] = await pool.execute(
        'SELECT * FROM mascotas WHERE id_duenio = ?',
        [id_duenio]
    );
    return rows as Mascota[];
};

/**
 * Crea un nuevo registro de mascota.
 * @param mascota Objeto con los datos de la mascota.
 * @returns El ID asignado por la base de datos al nuevo registro.
 */
export const create = async (mascota: Omit<Mascota, 'id'> & { usuario_id: number }): Promise<number> => {
    const [result] = await pool.execute(
        'INSERT INTO mascotas (nombre, especie, fecha_nacimiento, id_duenio, usuario_id) VALUES (?, ?, ?, ?, ?)',
        [mascota.nombre, mascota.especie, mascota.fecha_nacimiento, mascota.id_duenio, mascota.usuario_id]
    );
    return (result as any).insertId;
};

/**
 * Actualiza los datos de una mascota existente.
 * @param id El ID de la mascota a actualizar.
 * @param datos Objeto con los campos que se desean modificar.
 * @returns true si se actualizó al menos una fila, false de lo contrario.
 */
export const update = async (id: number, datos: Partial<Mascota>): Promise<boolean> => {
    const fields = Object.keys(datos).map(key => `${key} = ?`).join(', ');
    const values = Object.values(datos);

    if (fields.length === 0) return false;

    const [result] = await pool.execute(
        `UPDATE mascotas SET ${fields} WHERE id = ?`,
        [...values, id]
    );
    return (result as any).affectedRows > 0;
};

/**
 * Elimina una mascota de la base de datos por su ID.
 * @param id El ID de la mascota a borrar.
 * @returns true si se eliminó correctamente, false si no se encontró el registro.
 */
export const deleteById = async (id: number): Promise<boolean> => {
    const [result] = await pool.execute(
        'DELETE FROM mascotas WHERE id = ?',
        [id]
    );
    return (result as any).affectedRows > 0;
};

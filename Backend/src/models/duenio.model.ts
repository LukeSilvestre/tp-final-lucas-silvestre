import pool from '../config/database';
import { Duenio } from '../types/duenio';

/**
 * Lista todos los dueños de mascotas.
 */
export const findAll = async (): Promise<Duenio[]> => {
  const [rows] = await pool.execute('SELECT * FROM duenios');
  return rows as Duenio[];
};

/**
 * Obtiene los datos de un dueño por su identificador único.
 */
export const findById = async (id: number): Promise<Duenio | null> => {
  const [rows] = await pool.execute(
    'SELECT * FROM duenios WHERE id = ?',
    [id]
  );
  const duenios = rows as Duenio[];
  return duenios.length > 0 ? duenios[0] : null;
};

/**
 * Registra un nuevo dueño en el sistema.
 * @returns El ID del registro insertado.
 */
export const create = async (duenio: Omit<Duenio, 'id'>): Promise<number> => {
  const [result] = await pool.execute(
    'INSERT INTO duenios (nombre, apellido, telefono, direccion) VALUES (?, ?, ?, ?)',
    [duenio.nombre, duenio.apellido, duenio.telefono, duenio.direccion]
  );
  return (result as any).insertId;
};

export const update = async (id: number, datos: Partial<Duenio>): Promise<boolean> => {
  const [result] = await pool.execute(
    'UPDATE duenios SET nombre = ?, apellido = ?, telefono = ?, direccion = ? WHERE id = ?',
    [datos.nombre, datos.apellido, datos.telefono, datos.direccion, id]
  );
  return (result as any).affectedRows > 0;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const [result] = await pool.execute(
    'DELETE FROM duenios WHERE id = ?',
    [id]
  );
  return (result as any).affectedRows > 0;
};

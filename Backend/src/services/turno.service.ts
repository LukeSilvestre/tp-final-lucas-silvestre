import * as turnoModel from '../models/turno.model';
import { CreateTurnoDTO, UpdateTurnoDTO, TurnoResponseDTO } from '../types/turno';

/**
 * Obtiene los turnos según el rol del usuario.
 */
export const obtenerTurnos = async (rol: string, usuarioId: number): Promise<TurnoResponseDTO[]> => {
    if (rol === 'admin') {
        return await turnoModel.getAllTurnos();
    }
    return await turnoModel.getTurnosByUsuario(usuarioId);
};

/**
 * Crea un nuevo turno.
 */
export const crearTurno = async (datos: CreateTurnoDTO): Promise<number> => {
    return await turnoModel.createTurno(datos);
};

/**
 * Actualiza un turno existente.
 */
export const actualizarTurno = async (id: number, datos: UpdateTurnoDTO): Promise<boolean> => {
    return await turnoModel.updateTurno(id, datos);
};

/**
 * Elimina un turno.
 */
export const eliminarTurno = async (id: number): Promise<boolean> => {
    return await turnoModel.deleteTurno(id);
};

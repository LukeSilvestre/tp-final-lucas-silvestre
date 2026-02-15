// src/services/historial.service.ts
import * as historialModel from '../models/historial-clinico.model';
import * as veterinarioModel from '../models/veterinario.model';
import { CreateHistorialDTO, UpdateHistorialDTO, HistorialResponseDTO } from '../types/historial-clinico';

export const obtenerHistoriales = async (rol: string, usuarioId: number): Promise<HistorialResponseDTO[]> => {
    if (rol === 'admin') {
        return await historialModel.getAllHistoriales();
    }
    return await historialModel.getHistorialByUsuario(usuarioId);
};

export const obtenerHistorialPorId = async (id: number, rol: string, usuarioId: number): Promise<HistorialResponseDTO | null> => {
    if (rol === 'admin') {
        return await historialModel.getHistorialByIdSinRestriccion(id);
    }
    return await historialModel.getHistorialById(id, usuarioId);
};

export const crearHistorial = async (datos: CreateHistorialDTO, usuarioId: number): Promise<number> => {
    const veterinarioId = await veterinarioModel.findVeterinarioByUsuarioId(usuarioId);
    if (!veterinarioId) {
        throw new Error('El usuario no está asociado a un perfil de veterinario');
    }

    return await historialModel.createHistorial(datos, usuarioId, veterinarioId);
};

export const actualizarHistorial = async (id: number, datos: UpdateHistorialDTO, rol: string, usuarioId: number): Promise<boolean> => {
    const esAdmin = rol === 'admin';
    return await historialModel.updateHistorial(id, datos, usuarioId, esAdmin);
};

export const eliminarHistorial = async (id: number, rol: string, usuarioId: number): Promise<boolean> => {
    const esAdmin = rol === 'admin';
    return await historialModel.deleteHistorial(id, usuarioId, esAdmin);
};

// src/services/mascota.service.ts
import * as mascotaModel from '../models/mascota.model';
import { Mascota } from '../types/mascota';
import { logger } from '../config/logger';

export const obtenerTodasLasMascotas = async (rol: string, usuarioId: number): Promise<Mascota[]> => {
    logger.info(`Buscando mascotas para rol: ${rol}, usuario: ${usuarioId}`);

    if (rol === 'admin') {
        return await mascotaModel.findAll();
    }

    // Si no es admin, filtro por el usuario que las creó
    return await mascotaModel.findByUsuarioId(usuarioId);
};

export const obtenerMascotaPorId = async (id: number, rol: string, usuarioId: number): Promise<Mascota | null> => {
    const mascota = await mascotaModel.findById(id);

    if (!mascota) return null;

    // Verificación de propiedad (Ownership)
    if (rol !== 'admin' && (mascota as any).usuario_id !== usuarioId) {
        throw new Error('No tienes permiso para ver esta mascota');
    }

    return mascota;
};

export const crearMascota = async (datos: Omit<Mascota, 'id'>, usuarioId: number): Promise<number> => {
    // adjunto el usuario que la crea
    const nuevaMascota = {
        ...datos,
        usuario_id: usuarioId
    } as any;

    return await mascotaModel.create(nuevaMascota);
};

export const actualizarMascota = async (id: number, datos: Partial<Mascota>, rol: string, usuarioId: number): Promise<boolean> => {
    const mascotaExistente = await mascotaModel.findById(id);

    if (!mascotaExistente) return false;

    if (rol !== 'admin' && (mascotaExistente as any).usuario_id !== usuarioId) {
        throw new Error('No tienes permiso para actualizar esta mascota');
    }

    return await mascotaModel.update(id, datos);
};

export const eliminarMascota = async (id: number): Promise<boolean> => {
    // Solo admin (controlado en el router)
    return await mascotaModel.deleteById(id);
};

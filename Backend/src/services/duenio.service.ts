// src/services/duenio.service.ts
import * as duenioModel from '../models/duenio.model';
import { Duenio } from '../types/duenio';
import { logger } from '../config/logger';

export const obtenerTodosLosDuenios = async (): Promise<Duenio[]> => {
    return await duenioModel.findAll();
};

export const obtenerDuenioPorId = async (id: number): Promise<Duenio | null> => {
    return await duenioModel.findById(id);
};

export const crearDuenio = async (datos: Omit<Duenio, 'id'>): Promise<number> => {
    return await duenioModel.create(datos);
};

export const actualizarDuenio = async (id: number, datos: Partial<Duenio>): Promise<boolean> => {
    return await duenioModel.update(id, datos);
};

export const eliminarDuenio = async (id: number): Promise<boolean> => {
    return await duenioModel.deleteById(id);
};

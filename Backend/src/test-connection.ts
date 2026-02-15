import { testConnection } from './config/database';

async function runTest() {
    console.log('--- Iniciando prueba de conexión ---');
    try {
        await testConnection();
        console.log('--- Prueba terminada con éxito ---');
        process.exit(0);
    } catch (error) {
        console.error('--- Prueba fallida ---');
        process.exit(1);
    }
}

runTest();

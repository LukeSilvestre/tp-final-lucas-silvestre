// src/config/database.ts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

// Creo pool de conexiones
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'veterinaria_patitas_felices',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para probar la conexión
export const testConnection = async (): Promise<void> => {
  try {
    // Obtener una conexión del pool
    const connection = await pool.getConnection();
    console.log('✅ MySQL conectado exitosamente');
    
    // Liberar la conexión de vuelta al pool
    connection.release();
  } catch (error) {
    console.error('❌ Error al conectar MySQL:', error);
    process.exit(1); // Salir si no puede conectar
  }
};

// Exportar el pool para usarlo en otros archivos
export default pool;
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Función central para hacer peticiones a nuestra API.
 * Se encarga de agregar el Token de seguridad si el usuario está logueado.
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    // 1. Obtenemos el token que guardamos al iniciar sesión
    const token = localStorage.getItem('token');

    // 2. Preparo los headers (cabeceras)
    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    // Si tenemos token, lo agregamos como "Bearer token"
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    // 3. Hacemos la petición real
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    // 4. Si la respuesta es un error (400, 401, 500, etc), se lanza una excepción
    if (!response.ok) {
        const errorData = await response.json();

        // Manejo de errores de validación (express-validator devuelve un array 'errors')
        if (errorData.errors && Array.isArray(errorData.errors)) {
            const messages = errorData.errors.map((err: any) => `${err.path || err.param}: ${err.msg}`).join(', ');
            throw new Error(`Errores de validación: ${messages}`);
        }

        throw new Error(errorData.error || errorData.message || 'Error en la petición');
    }

    // 5. Si todo está bien, devolvemos los datos
    return response.json();
}

# TP Intermedio - Backend Veterinaria Patitas Felices

## 📋 Requisitos Cumplidos

- ✅ Express + MySQL + JWT + Arquitectura MVC
- ✅ Autenticación segura con bcrypt y tokens JWT
- ✅ Entidad protegida: Historial Clínico
- ✅ Control de acceso por roles (admin/veterinario)
- ✅ Validación de datos con express-validator
- ✅ Manejo centralizado de errores
- ✅ Variables de entorno con dotenv

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js 18+
- MySQL 5.7+
- npm o yarn

### Pasos

1. Clonar repositorio: `git clone [url-del-repo]`
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   # Editar .env con tus credenciales
   ```
4. Importar base de datos: `Importar directo en MySQL`
5. Ejecutar en desarrollo: `npm run dev`
6. Ejecutar en producción: `npm run build && npm start`

### Scripts disponibles

- `npm run dev` - Desarrollo con hot-reload
- `npm run build` - Compilar TypeScript
- `npm start` - Ejecutar en producción
- `npx tsc --noEmit` - Verificar tipos TypeScript

## 🔧 Configuración de Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

### Opción con Docker (recomendada)

Si prefieres usar Docker para la base de datos:

1. **Levantar MySQL con Docker Compose:**

```bash
# En la carpeta del proyecto
docker-compose up -d
```

2. **Verificar que MySQL está corriendo:**

```bash
docker ps
```

3. **Importar la base de datos:**

```
Iniciar phpMyAdmin en http://localhost:8080/index.php
Importar desde el dashboard, en la sopala "Importar" el archivo scripts/veterinaria_patitas_felices.sql
```

### Archivo docker-compose.yml de ejemplo:

```yaml
version: "3.8"
services:
  mysql:
    image: mysql:5.7
    container_name: mysql_veterinaria
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: veterinaria_patitas_felices
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    restart: unless-stopped

volumes:
  mysql_data:
```

**Variables de entorno para Docker:**

```bash
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=root_password  # La misma que en docker-compose.yml
MYSQL_DATABASE=veterinaria_patitas_felices
```

```bash
# Puerto del servidor
PORT=3000

# Configuración MySQL
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=tu_password_aqui
MYSQL_DATABASE=veterinaria_patitas_felices

# Configuración JWT
JWT_SECRET=mi_secreto_super_seguro_aqui
JWT_EXPIRES_IN=1h
```

### Notas importantes

- **NUNCA** subir el archivo `.env` al repositorio
- Usar `.env.example` como plantilla
- En producción, usar variables de entorno del sistema o servicio de secrets

## 🔐 Autenticación

### Registrar nuevo usuario

```bash
POST /api/auth/registrar
Content-Type: application/json

{
  "email": "veterinario@patitasfelices.com",
  "password": "Password123!",
  "nombre": "Juan",
  "apellido": "Pérez",
  "rol": "veterinario",
  "matricula": "VET-12345",
  "especialidad": "Cirugía"
}
```

### Iniciar sesión

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "veterinario@patitasfelices.com",
  "password": "Password123!"
}
```

### Perfil de usuario (protegido)

```bash
GET /api/auth/perfil
Authorization: Bearer [token_jwt]
```

### Respuestas de ejemplo

**Login exitoso:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": 1,
    "email": "veterinario@patitas.com",
    "nombre": "Juan",
    "apellido": "Pérez",
    "rol": "veterinario"
  }
}
```

## 🩺 Historial Clínico (Entidad Protegida)

**Todas las rutas requieren header:** `Authorization: Bearer [token_jwt]`

### Listar historiales

```bash
GET /api/historial
```

- **Admin:** Ve todos los historiales
- **Veterinario:** Solo ve sus propios historiales

### Obtener historial específico

```bash
GET /api/historial/:id
```

### Crear nuevo historial

```bash
POST /api/historial
Content-Type: application/json

{
  "id_mascota": 1,
  "descripcion": "Consulta de control anual"
}
```

### Actualizar historial

```bash
PATCH /api/historial/:id
Content-Type: application/json

{
  "descripcion": "Descripción actualizada"
}
```

### Eliminar historial

```bash
DELETE /api/historial/:id
```

### Respuesta de ejemplo (GET /api/historial)

```json
{
  "cantidad": 2,
  "historiales": [
    {
      "id": 1,
      "id_mascota": 1,
      "mascota_nombre": "Antonia",
      "duenio_nombre": "María",
      "id_veterinario": 1,
      "veterinario_nombre": "Dr. Juan",
      "usuario_id": 12,
      "fecha_registro": "2025-12-19T05:23:49.000Z",
      "descripcion": "Control anual"
    }
  ]
}
```

## 🧪 Ejemplos Prácticos con cURL

### Registrar Administrador del Sistema

```bash
curl -X POST http://localhost:3000/api/auth/registrar \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin_lgs@patitasfelices.com",
    "password": "Admin123!",
    "nombre": "Administrador",
    "apellido": "Sistema",
    "rol": "admin"
  }'
```

### Registrar Veterinario

```bash
curl -X POST http://localhost:3000/api/auth/registrar \
  -H "Content-Type: application/json" \
  -d '{
    "email": "beni.pepe@patitasfelices.com",
    "password": "JoseHernandez1!",
    "nombre": "Benicio",
    "apellido": "Pepe",
    "rol": "veterinario",
    "matricula": "VET-001",
    "especialidad": "Cirugía"
  }'
```

### Login (¡Resguardar Token!)

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "beni.pepe@patitasfelices.com",
    "password": "JoseHernandez1!"
  }'
```

### Obtener perfil del usuario

```bash
curl -X GET http://localhost:3000/api/auth/perfil \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Obtener Historial Clínico

```bash
curl -X GET http://localhost:3000/api/historial \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

_Nota: Si es Admin ve todos los historiales, si es Veterinario solo ve los que creó._

### Crear Historial Clínico nuevo

```bash
curl -X POST http://localhost:3000/api/historial \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"id_mascota":2,"descripcion":"Problemas renales"}'
```

### Eliminar Historial Clínico

```bash
curl -X DELETE http://localhost:3000/api/historial/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 👤 Dueños (Protegido - Lectura para veterinarios, CRUD para admin)

**Todas las rutas requieren header:** `Authorization: Bearer [token_jwt]`

### Listar dueños

```bash
GET /api/duenios
```

- **Admin y Veterinario:** Pueden ver todos los dueños

### Obtener dueño específico

```bash
GET /api/duenios/:id
```

### Crear nuevo dueño (solo admin)

```bash
POST /api/duenios
Content-Type: application/json
Authorization: Bearer [token_admin]

{
  "nombre": "Nuevo",
  "apellido": "Dueño",
  "telefono": "11-9999-8888",
  "direccion": "Calle 123"
}
```

### Actualizar dueño (solo admin)

```bash
PATCH /api/duenios/:id
Content-Type: application/json
Authorization: Bearer [token_admin]

{
  "telefono": "11-7777-5555"
}
```

### Eliminar dueño (solo admin)

```bash
DELETE /api/duenios/:id
Authorization: Bearer [token_admin]
```

### Ejemplo de respuesta (GET /api/duenios)

```json
{
  "cantidad": 3,
  "duenios": [
    {
      "id": 1,
      "nombre": "María",
      "apellido": "González",
      "telefono": "11-1234-5678",
      "direccion": "Av. Siempre Viva 123"
    }
  ]
}
```

## 🏗️ Estructura del Proyecto

```
src/
├── config/           # Configuración de base de datos
│   └── database.ts
├── controllers/      # Controladores de endpoints
│   ├── auth.controller.ts
│   └── historial.controller.ts
├── middlewares/      # Middlewares personalizados
│   └── auth.middleware.ts
├── models/          # Modelos de datos y acceso a BD
│   ├── usuario.model.ts
│   ├── veterinario.model.ts
│   ├── historial-clinico.model.ts
│   ├── mascota.model.ts
│   └── duenio.model.ts
├── routes/          # Definición de rutas
│   ├── auth.routes.ts
│   └── historial.routes.ts
├── services/        # Lógica de negocio
│   └── auth.service.ts
├── types/           # Tipos TypeScript e interfaces
│   ├── auth.ts
│   ├── usuario.ts
│   ├── historial-clinico.ts
│   └── express.d.ts
├── validators/      # Validadores express-validator
│   ├── auth.validators.ts
│   └── historial.validator.ts
└── index.ts         # Punto de entrada de la aplicación
```

## 🛡️ Seguridad y Validaciones

### Autenticación

- Tokens JWT con expiración configurable
- Passwords hasheados con bcrypt
- Middleware de verificación de token en todas las rutas protegidas

### Autorización

- Sistema de roles: `admin` y `veterinario`
- Admin: Acceso completo a todos los recursos
- Veterinario: Solo acceso a sus propios recursos

### Validaciones

- Express-validator para validación de datos de entrada
- Sanitización de inputs (trim, normalizeEmail)
- Validación de tipos y formatos

## 🐛 Manejo de Errores

La aplicación incluye manejo centralizado de errores:

- Errores de validación: 400 Bad Request
- Errores de autenticación: 401 Unauthorized
- Errores de autorización: 403 Forbidden
- Recursos no encontrados: 404 Not Found
- Errores del servidor: 500 Internal Server Error

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles.

## 👥 Autor

Lucas Silvestre - TP Intermedio Backend - UTN

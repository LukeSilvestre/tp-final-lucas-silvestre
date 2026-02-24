# 🐾 Patitas Felices - Sistema de Gestión Veterinaria (TP Final)

Este proyecto es una plataforma integral para la gestión de una clínica veterinaria, desarrollada como **Trabajo Práctico Final** para la cursada de Backend. Permite administrar dueños, mascotas, veterinarios y sus respectivos historiales clínicos de forma segura y eficiente.

---

## 🚀 Requisitos y Cumplimiento (Análisis End-to-End)

El sistema ha sido revisado para cumplir con el 100% de los requisitos del profesor:

### 💻 Backend (Node.js + TypeScript)
- **Arquitectura MVC**: Separación clara en `routes`, `controllers`, `services`, `models` y `types`.
- **Seguridad**: Autenticación con **JWT** y encriptación de contraseñas con **bcrypt**.
- **Validación**: Uso de `express-validator` en todos los inputs sensibles.
- **Manejo de Errores**: Middleware centralizado para respuestas de error consistentes.
- **DTOs**: Interfaces definidias para la transferencia de datos.
- **Entorno**: Configuración mediante archivo `.env` (orientado a Docker).

### 🗄️ Base de Datos (MySQL)
- **Dockerizado**: Entorno listo con `docker-compose`.
- **Relacional**: Uso estricto de Claves Primarias y Foráneas.
- **Integridad**: Relaciones uno-a-muchos (Dueño -> Mascota -> Historial).
- **Dump Incluido**: El archivo de inicialización se encuentra en `Backend/scripts/`.

### 🌐 Frontend (React + TypeScript)
- **Integración Real**: Consumo de la API REST mediante servicios desacoplados.
- **CRUD Completo**: Implementado en las entidades de **Historial Clínico** y **Turnos**.
- **Calendario Interactivo**: Sistema de agenda dinámico con navegación por semanas.


---

## 🛠️ Tecnologías Utilizadas

| Componente  | Tecnologías                                      |
| :----------:| :-----------------------------------------------:|
| **Backend** | Node.js, Express, TypeScript, MySQL, JWT, Bcrypt |
| **Frontend**| React, Vite, TypeScript, TailwindCSS             |
| **DevOps**  | Docker, Docker Compose                           |
| **Diseño**  | Space Grotesk, Material Symbols                  |

---

## 📦 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/LukeSilvestre/tp-final-lucas-silvestre.git
cd tp-final-lucas-silvestre
```

### 2. Configurar la Base de Datos (Docker)
Asegúrate de tener Docker instalado y luego ejecuta:
```bash
cd Backend
docker-compose up -d
```
*Esto iniciará MySQL en el puerto 3306 y phpMyAdmin en el 8080.*
*El esquema se inicializa automáticamente mediante el dump en `Backend/scripts/`.*

### 3. Levantar el Backend
```bash
cd Backend
npm install
cp .env.example .env
# Revisar que las credenciales del .env coincidan con docker
npm run dev
```

### 4. Levantar el Frontend
```bash
cd ../Frontend
npm install
npm run dev
```

---

## 🔑 Variables de Entorno (Backend)

| Variable         | Descripción               | Ejemplo                       |
| :--------------: | :-----------------------: | :--------------------------:  |
| `PORT`           | Puerto del servidor       | `3000`                        |
| `MYSQL_HOST`     | Host de la base de datos  | `localhost`                   |
| `MYSQL_USER`     | Usuario de MySQL          | `root`                        |
| `MYSQL_PASSWORD` | Contraseña de MySQL       | `root_password`               |
| `MYSQL_DATABASE` | Nombre de la BD           | `veterinaria_patitas_felices` |
| `JWT_SECRET`     | Firma para los tokens     | `tu_secreto_seguro`           |

---

## 🩺 Endpoints Principales

### Autenticación
- `POST /api/auth/registrar`: Registro de nuevos usuarios.
  - **Público**: Permite que cualquier profesional se registre (solo con rol `veterinario` por defecto).
  - **Admin**: Sólo el usuario "admin_lgs" con rol Administrador puede asignar roles específicos estando logueado. Las credenciales se pueden ver en la collection de postman que está dentro del directorio Backend/docs [línea 375].
- `POST /api/auth/login`: Obtención de Bearer Token.

### Historial Clínico
- `GET /api/historial`: Listado filtrado por rol (Dueño o Veterinario).
- `POST /api/historial`: Crear nueva entrada.
- `PATCH /api/historial/:id`: Actualizar observaciones o tipo.
- `DELETE /api/historial/:id`: Eliminar registro.

### Gestión de Turnos (Citas)
- `GET /api/turnos`: Obtener agenda (Global para admin, propia para vet).
- `POST /api/turnos`: Agendar una nueva cita.
- `DELETE /api/turnos/:id`: Cancelar un turno existente.
- `GET /api/veterinarios`: Obtener listado de profesionales registrados.

---

## 🧪 Pruebas e Integración

Se incluye una colección de **Postman** lista para importar en:
`Backend/docs/Vet-Patitas-Felices.postman_collection.json`

---

## 👥 Autor
**Lucas Silvestre** - Estudiante de Desarrollo Web (UTN Argentina).
Proyecto realizado para la materia de Backend.

---
_Patitas Felices - Porque tu mascota merece lo mejor._

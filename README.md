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
- **CRUD Completo**: Implementado funcionalmente en la entidad **Historial Clínico** (Listar, Crear, Editar y Eliminar).
- **Aesthetics**: Interfaz moderna, responsiva.

---

## 🛠️ Tecnologías Utilizadas

| Componente  | Tecnologías                                      |
| :----------:| :-----------------------------------------------:|
| **Backend** | Node.js, Express, TypeScript, MySQL, JWT, Bcrypt |
| **Frontend**| React, Vite, TypeScript, TailwindCSS             |
| **DevOps**  | Docker, Docker Compose                           |
| **Testing** | Postman                                          |

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
*Importar el dump `Backend/scripts/veterinaria_patitas_felices.sql` desde phpMyAdmin (http://localhost:8080).*

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
- `POST /api/auth/registrar`: Registro de nuevos veterinarios o admins.
- `POST /api/auth/login`: Obtención de Bearer Token.

### Historial Clínico (CRUD Completo)
- `GET /api/historial`: Listado filtrado por rol.
- `POST /api/historial`: Crear nueva entrada.
- `PATCH /api/historial/:id`: Actualizar observaciones o tipo.
- `DELETE /api/historial/:id`: Eliminar registro (Casquete en cascada).

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

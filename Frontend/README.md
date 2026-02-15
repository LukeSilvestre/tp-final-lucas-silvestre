# 🌐 Patitas Felices - Frontend

Este es el cliente web para el sistema de gestión veterinaria **Patitas Felices**. Desarrollado con tecnologías modernas para ofrecer una experiencia de usuario fluida, rápida y segura.

---

## 🛠️ Tecnologías

- **React 19**: Biblioteca principal para la interfaz de usuario.
- **TypeScript**: Para un desarrollo robusto y tipado estático.
- **Vite**: Herramienta de construcción ultra rápida para el desarrollo.
- **TailwindCSS**: Framework de CSS para un diseño moderno y responsivo.
- **Material Symbols**: Set de iconos para una navegación intuitiva.

---

## 🚀 Ejecución Local

### Prerrequisitos
- **Node.js**: Versión 18 o superior.
- **Backend**: El servidor de la API debe estar corriendo (por defecto en el puerto 3000).

### Pasos
1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Correr en modo desarrollo**:
   ```bash
   npm run dev
   ```
   *La aplicación estará disponible por defecto en [http://localhost:5173](http://localhost:5173).*

---

## 📂 Estructura de Carpetas

- `components/`: Componentes reutilizables (Header, Sidebar, etc).
- `pages/`: Vistas principales de la aplicación (Login, Historial, Dueños).
- `services/`: Lógica de comunicación con la API (`api.ts`).
- `types.ts`: Definición de interfaces globales de TypeScript.

---

## 🩺 Funcionalidades Principales
- **Gestión Clínica**: CRUD completo de historiales médicos.
- **Panel de Seguridad**: Control de acceso y cierre de sesión.
- **Gestión de Pacientes**: Visualización de dueños y mascotas registradas.
- **Interfaz Adaptable**: Diseño responsivo y soporte para tema oscuro.

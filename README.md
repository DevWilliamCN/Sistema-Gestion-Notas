#  Sistema de Gestión de Estudiantes

Este proyecto es una aplicación web completa para la gestión de estudiantes, desarrollada con **React + Vite** en el frontend y **Node.js + SQLite** en el backend. Permite agregar, editar, eliminar, filtrar y buscar estudiantes, con una interfaz moderna, responsiva y fácil de usar.

---

##  Funcionalidades

-  Agregar nuevos estudiantes
-  Buscar por nombre (popup editable)
-  Modificar datos existentes
-  Eliminar estudiantes
-  Filtrar por grupo
-  Totalmente responsivo

---



##  Tecnologías utilizadas

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [SQLite3](https://www.sqlite.org/)

---

##  Estructura del proyecto

```
/proyecto/
├── frontend/             # React + Vite
│   └── src/pages/Estudiantes.jsx
├── server/               # Backend Express + SQLite
│   ├── controllers/
│   ├── db/
│   └── routes/
└── README.md
```

---

##  Cómo ejecutar el proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/gestion-estudiantes.git
cd gestion-estudiantes
```

### 2. Instala dependencias

####  Backend

```bash
cd server
npm install
node index.js
```

El backend se ejecutará en `http://localhost:3001`

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend se ejecutará en `http://localhost:5173`

---

##  Despliegue sugerido

- **Frontend**: [Vercel](https://vercel.com/)
- **Backend**: [Render](https://render.com/)
- **Base de datos local**: SQLite embebido (ideal para pruebas y proyectos educativos)

---

##  Créditos

Desarrollado por **William Cubero**  
 Gmail: w.cubero800@gmail.com  
© 2025 - Proyecto personal

---

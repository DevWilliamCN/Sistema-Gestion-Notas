const express = require('express');
const cors = require('cors');
const estudiantesRoutes = require('./routes/estudiantes');
require('./db/database');

const app = express();
const PORT = 3001;

// ✅ CORS: Permitir cualquier origen (para desarrollo local)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/estudiantes', estudiantesRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});

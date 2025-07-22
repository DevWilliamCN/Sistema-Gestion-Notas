const express = require('express');
const cors = require('cors');
const estudiantesRoutes = require('./routes/estudiantes');
require('./db/database');

const app = express();


const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.use('/api/estudiantes', estudiantesRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});

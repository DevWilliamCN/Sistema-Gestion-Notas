// 📁 server/index.js
const express = require('express');
const cors = require('cors');
const estudiantesRoutes = require('./routes/estudiantes');
require('./db/database');

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/api/estudiantes', estudiantesRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});

// 📁 server/db/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error('Error al conectar con SQLite:', err);
  console.log('✅ Conectado a SQLite');
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS estudiantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      correo TEXT,
      grupo TEXT,
      sexo TEXT
    )
  `);
});

module.exports = db;

// 📁 server/controllers/estudiantesController.js
const db = require('../db/database');

exports.obtenerEstudiantes = (req, res) => {
  db.all('SELECT * FROM estudiantes', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.agregarEstudiante = (req, res) => {
  const { nombre, correo, grupo, sexo } = req.body;
  const query = 'INSERT INTO estudiantes (nombre, correo, grupo, sexo) VALUES (?, ?, ?, ?)';
  db.run(query, [nombre, correo, grupo, sexo], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, nombre, correo, grupo, sexo });
  });
};

// 📁 server/routes/estudiantes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/estudiantesController');

router.get('/', controller.obtenerEstudiantes);
router.post('/', controller.agregarEstudiante);

module.exports = router;

// 📁 client/src/App.jsx
import { useState, useEffect } from "react";
import ilustracion from "./assets/Graduation-rafiki.svg";

function App() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [grupo, setGrupo] = useState("");
  const [estudiantes, setEstudiantes] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const nombresFemeninos = [
    "ana", "maria", "josefina", "laura", "carmen", "sofia",
    "valentina", "isabel", "paula", "fernanda", "carolina", "andrea", "luisa", "rosa"
  ];

  const determinarSexo = (nombre) => {
    const primerNombre = nombre.trim().toLowerCase().split(" ")[0];
    return nombresFemeninos.includes(primerNombre) ? "Femenino" : "Masculino";
  };

  const obtenerEstudiantes = async () => {
    const res = await fetch("http://localhost:3001/api/estudiantes");
    const data = await res.json();
    setEstudiantes(data);
  };

  const agregarEstudiante = async () => {
    if (!nombre.trim() || !correo.trim()) return;
    const sexo = determinarSexo(nombre);

    await fetch("http://localhost:3001/api/estudiantes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo, grupo, sexo }),
    });

    setNombre("");
    setCorreo("");
    setGrupo("");
    setMensaje("✅ Estudiante agregado con éxito");
    obtenerEstudiantes();
    setTimeout(() => setMensaje(""), 3000);
  };

  useEffect(() => {
    obtenerEstudiantes();
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <img src={ilustracion} alt="Ilustración" className="img-fluid" style={{ maxWidth: "300px" }} />
        <h1 className="display-5 fw-bold mt-4 text-primary">Sistema de Gestión de Estudiantes</h1>
      </div>

      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "900px" }}>
        <h2 className="h4 mb-4">Agregar Estudiante</h2>
        <div className="row g-3 mb-3">
          <div className="col-md-5">
            <input type="text" className="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="col-md-5">
            <input type="email" className="form-control" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control" placeholder="Grupo" value={grupo} onChange={(e) => setGrupo(e.target.value)} />
          </div>
        </div>
        <div className="d-grid">
          <button className="btn btn-primary" onClick={agregarEstudiante}>Agregar estudiante</button>
        </div>
        {mensaje && <div className="alert alert-success text-center mt-3" role="alert">{mensaje}</div>}
      </div>

      <ul className="list-group list-group-flush mt-4 mx-auto" style={{ maxWidth: "900px" }}>
        {estudiantes.map((est, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <strong className="text-uppercase">{est.nombre}</strong> –
              <span className="text-muted"> {est.correo}</span> –
              <span className="text-success"> Grupo: {est.grupo}</span> –
              {est.sexo && (
                <span className={est.sexo === "Femenino" ? "text-danger" : "text-primary"}>
                  {est.sexo}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
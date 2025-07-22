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


exports.eliminarEstudiante = (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM estudiantes WHERE id = ?';
  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Estudiante eliminado correctamente', id });
  });
};



exports.actualizarEstudiante = (req, res) => {
  const { id } = req.params;
  const { nombre, correo, grupo, sexo } = req.body;

  const query = 'UPDATE estudiantes SET nombre = ?, correo = ?, grupo = ?, sexo = ? WHERE id = ?';
  db.run(query, [nombre, correo, grupo, sexo, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, nombre, correo, grupo, sexo });
  });
};

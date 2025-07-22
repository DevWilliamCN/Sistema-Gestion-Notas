import { useEffect, useState } from "react";
import axios from "axios";
import ilustracion from "../assets/Graduation-rafiki.svg";
import "./Estudiantes.css";

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    grupo: "",
    sexo: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [filtroGrupo, setFiltroGrupo] = useState("Todos");

  const fetchEstudiantes = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/estudiantes");
      setEstudiantes(res.data);
    } catch (err) {
      console.error("Error al obtener estudiantes:", err);
    }
  };


  
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (form.id) {
      // ACTUALIZAR estudiante existente
      await axios.put(`http://localhost:3001/api/estudiantes/${form.id}`, form);
    } else {
      // AGREGAR nuevo estudiante
      await axios.post("http://localhost:3001/api/estudiantes", form);
    }

    setForm({ nombre: "", correo: "", grupo: "", sexo: "" }); // limpiar
    fetchEstudiantes(); // recargar lista
  } catch (err) {
    console.error("Error al guardar estudiante:", err);
  }
};

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/estudiantes/${id}`);
      fetchEstudiantes();
    } catch (err) {
      console.error("Error al eliminar estudiante:", err);
    }
  };

  const estudiantesFiltrados =
    filtroGrupo === "Todos"
      ? estudiantes
      : estudiantes.filter((e) => e.grupo === filtroGrupo);

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const [popupAbierto, setPopupAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const estudiantesBuscados = estudiantes.filter((e) =>
    e.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="estudiantes-wrapper">
      <header className="estudiantes-header">
        <h1>Sistema de Gestión </h1>
        <div className="filtro-grupo">
          <label htmlFor="grupo">Filtrar por grupo: </label>
          <select
            id="grupo"
            value={filtroGrupo}
            onChange={(e) => setFiltroGrupo(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="1">Grupo 1</option>
            <option value="2">Grupo 2</option>
            <option value="3">Grupo 3</option>
            <option value="4">Grupo 4</option>
            <option value="5">Grupo 5</option>
            <option value="6">Grupo 6</option>
          </select>
        </div>
      </header>

      <main className="estudiantes-container">
        <div className="text-center">
          <img src={ilustracion} alt="Graduación" className="estudiantes-img" />
          <h2 className="titulo-principal">
            Sistema de Gestión de Estudiantes
          </h2>
        </div>

        <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
          <button
            style={{
              padding: "0.4rem 1rem",
              fontSize: "0.9rem",
              borderRadius: "6px",
              background: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
            onClick={() => setPopupAbierto(true)}
          >
            Editar por nombre
          </button>
        </div>

        {popupAbierto && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>Buscar estudiante</h3>
              <input
                type="text"
                placeholder="Escriba un nombre del estudiante..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <ul className="popup-result-list">
                {estudiantesBuscados.map((e) => (
                  <li key={e.id}>
                    {e.nombre}
                    <div className="popup-btn-group">
                      <button onClick={() => {
                        setForm(e);
                        setEditingId(e.id);
                        setPopupAbierto(false);
                      }}>
                        ✏️ Modificar
                      </button>
                      <button onClick={() => {
                        handleDelete(e.id);
                        setPopupAbierto(false);
                      }}>
                        🗑️ Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="cerrar-popup" onClick={() => setPopupAbierto(false)}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        <div className="card estudiantes-form-card">
          <h3>{editingId ? "Modificar Estudiante" : "Agregar Estudiante"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                type="text"
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Correo"
                value={form.correo}
                onChange={(e) => setForm({ ...form, correo: e.target.value })}
              />
              <input
                type="text"
                placeholder="Grupo"
                value={form.grupo}
                onChange={(e) => setForm({ ...form, grupo: e.target.value })}
              />
              <select
                value={form.sexo}
                onChange={(e) => setForm({ ...form, sexo: e.target.value })}
              >
                <option value="">Sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <button type="submit" className="btn-agregar">
              {editingId ? "Guardar cambios" : "Agregar estudiante"}
            </button>
          </form>
        </div>

        <ul className="estudiantes-list">
          {estudiantesFiltrados.map((e) => (
            <li key={e.id} className="list-group-item">
              <span>
                <strong>🧑 Nombre:</strong> {e.nombre} 
              </span>
              <span>
                <strong>📧 Correo:</strong> {e.correo || "Sin correo"} 
              </span>
              <span>
                <strong>🏫 Grupo:</strong> {e.grupo || "N/A"} 
              </span>
              <span>
                <strong>🚻 Sexo:</strong> {e.sexo || "N/A"}
              </span>
            </li>
          ))}
        </ul>
      </main>

      <footer className="estudiantes-footer">
        <p>Desarrollado por William Cubero © 2025 | Proyecto educativo</p>
      </footer>
    </div>
  );
};

export default Estudiantes;

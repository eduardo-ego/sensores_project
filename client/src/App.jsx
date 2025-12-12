import React, { useEffect, useState } from "react";
import "./styles/styles.css";
import { config } from "./config/config";

const API_URL = config;

export default function App() {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [sensorActivo, setSensorActivo] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    tipo: "",
    temperatura: "",
    humedad: "",
    voltaje: ""
  });

  /* ================= DATA ================= */
  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(API_URL);
    const data = await res.json();
    setSensores(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ nombre: "", tipo: "", temperatura: "", humedad: "", voltaje: "" });
    setModoEdicion(false);
    setSensorActivo(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nombre: form.nombre,
      tipo: form.tipo,
      temperatura: Number(form.temperatura),
      humedad: Number(form.humedad),
      voltaje: Number(form.voltaje)
    };

    const url = modoEdicion ? `${API_URL}/${sensorActivo.id}` : API_URL;
    const method = modoEdicion ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    resetForm();
    fetchData();
  };

  const editar = (s) => {
    setSensorActivo(s);
    setModoEdicion(true);
    setForm(s);
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar sensor?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchData();
  };

  const sensoresFiltrados = sensores.filter((s) =>
    s.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  /* ================= UI ================= */
  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h1>SensorSys</h1>
        <nav>
          <button className="active">Dashboard</button>
          <button>Sensores</button>
          <button>Reportes</button>
        </nav>
        <footer>{sensores.length} sensores</footer>
      </aside>

      {/* MAIN */}
      <div className="main">

        {/* HEADER */}
        <header className="header">
          <h2>Gestión de Sensores</h2>
          <input
            placeholder="Buscar sensor..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </header>

        {/* CONTENT */}
        <div className="content">

          {/* FORM */}
          <section className="card">
            <h3>{modoEdicion ? "Editar Sensor" : "Nuevo Sensor"}</h3>

            <form className="form-grid" onSubmit={handleSubmit}>
              <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
              <input name="tipo" placeholder="Tipo" value={form.tipo} onChange={handleChange} />
              <input name="temperatura" placeholder="Temperatura °C" value={form.temperatura} onChange={handleChange} />
              <input name="humedad" placeholder="Humedad %" value={form.humedad} onChange={handleChange} />
              <input name="voltaje" placeholder="Voltaje V" value={form.voltaje} onChange={handleChange} />

              <div className="form-actions">
                <button type="submit" className="primary">
                  {modoEdicion ? "Actualizar" : "Guardar"}
                </button>
                {modoEdicion && (
                  <button type="button" onClick={resetForm}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* LIST */}
          <section className="card">
            <h3>Listado</h3>

            {loading && <p>Cargando...</p>}

            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Temp</th>
                  <th>Humedad</th>
                  <th>Voltaje</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sensoresFiltrados.map((s) => (
                  <tr key={s.id}>
                    <td>{s.nombre}</td>
                    <td>{s.tipo}</td>
                    <td className={s.temperatura > 30 ? "alert" : ""}>{s.temperatura}°C</td>
                    <td>{s.humedad}%</td>
                    <td>{s.voltaje}V</td>
                    <td>
                      <button onClick={() => editar(s)}>Editar</button>
                      <button className="danger" onClick={() => eliminar(s.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </section>

        </div>
      </div>
    </div>
  );
}
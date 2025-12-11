import React, { useEffect, useState } from "react";
import "./styles/styles.css";
import { config } from "./config/config";

const API_URL = config;

export default function App() {
  const [sensores, setSensores] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    tipo: "",
    temperatura: "",
    humedad: "",
    voltaje: ""
  });

  const fetchData = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setSensores(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sensor = {
      nombre: form.nombre,
      tipo: form.tipo,
      temperatura: Number(form.temperatura),
      humedad: Number(form.humedad),
      voltaje: Number(form.voltaje)
    };

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sensor)
    });

    setForm({
      nombre: "",
      tipo: "",
      temperatura: "",
      humedad: "",
      voltaje: ""
    });

    fetchData();
  };

  const eliminar = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div className="container">
      <h1>Gestión de Sensores</h1>

      <div className="card">
        <h2>Registrar nuevo sensor</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Tipo</label>
            <input name="tipo" value={form.tipo} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Temperatura</label>
            <input name="temperatura" value={form.temperatura} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Humedad</label>
            <input name="humedad" value={form.humedad} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Voltaje</label>
            <input name="voltaje" value={form.voltaje} onChange={handleChange} />
          </div>

          <button type="submit" className="primary">Guardar Sensor</button>
        </form>
      </div>

      <div className="card">
        <h2>Listado de Sensores</h2>

        <div className="sensor-list">
          {sensores.map((s) => (
            <div key={s.id} className="sensor-card">
              <div className="sensor-info">
                <strong>{s.nombre}</strong> ({s.tipo})  
                <br />Temp: {s.temperatura}°C  
                <br />Humedad: {s.humedad}%  
                <br />Voltaje: {s.voltaje}V  
              </div>

              <div className="sensor-actions">
                <button className="danger" onClick={() => eliminar(s.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

import { v4 as uuid } from "uuid";
import db from "../DB/sqlite.js";

/**
 * GET /sensores
 * Obtener todos los sensores
 */
export const getSensores = (req, res) => {
  try {
    const sensores = db.prepare("SELECT * FROM sensores").all();
    res.json(sensores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener sensores" });
  }
};

/**
 * GET /sensores/:id
 * Obtener sensor por ID
 */
export const getSensorById = (req, res) => {
  try {
    const sensor = db
      .prepare("SELECT * FROM sensores WHERE id = ?")
      .get(req.params.id);

    if (!sensor) {
      return res.status(404).json({ error: "Sensor not found" });
    }

    res.json(sensor);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el sensor" });
  }
};

/**
 * POST /sensores
 * Crear un sensor
 */
export const createSensor = (req, res) => {
  try {
    const { nombre, tipo, temperatura, humedad, voltaje } = req.body;

    if (!nombre || !tipo) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const sensor = {
      id: uuid(),
      nombre,
      tipo,
      temperatura: temperatura ?? null,
      humedad: humedad ?? null,
      voltaje: voltaje ?? null,
      created_at: new Date().toISOString()
    };

    db.prepare(`
      INSERT INTO sensores
      (id, nombre, tipo, temperatura, humedad, voltaje, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      sensor.id,
      sensor.nombre,
      sensor.tipo,
      sensor.temperatura,
      sensor.humedad,
      sensor.voltaje,
      sensor.created_at
    );

    res.status(201).json(sensor);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el sensor" });
  }
};

/**
 * PUT /sensores/:id
 * Actualizar un sensor
 */
export const updateSensor = (req, res) => {
  try {
    const existing = db
      .prepare("SELECT * FROM sensores WHERE id = ?")
      .get(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: "Sensor not found" });
    }

    const updated = {
      ...existing,
      ...req.body
    };

    db.prepare(`
      UPDATE sensores SET
        nombre = ?,
        tipo = ?,
        temperatura = ?,
        humedad = ?,
        voltaje = ?
      WHERE id = ?
    `).run(
      updated.nombre,
      updated.tipo,
      updated.temperatura,
      updated.humedad,
      updated.voltaje,
      req.params.id
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el sensor" });
  }
};

/**
 * DELETE /sensores/:id
 * Eliminar un sensor
 */
export const deleteSensor = (req, res) => {
  try {
    const result = db
      .prepare("DELETE FROM sensores WHERE id = ?")
      .run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Sensor not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el sensor" });
  }
};

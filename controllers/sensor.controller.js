import { v4 as uuid } from "uuid";
import Sensor from "../models/sensor.model.js";

const sensores = [];

export const getSensores = (req, res) => {
  res.json(sensores);
};

export const getSensorById = (req, res) => {
  const sensor = sensores.find(s => s.id === req.params.id);
  if (!sensor) return res.status(404).json({ error: "Sensor not found" });
  res.json(sensor);
};

export const createSensor = (req, res) => {
  const { nombre, tipo, temperatura, humedad, voltaje } = req.body;

  if (!nombre || !tipo) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const sensor = new Sensor({
    id: uuid(),
    nombre,
    tipo,
    temperatura,
    humedad,
    voltaje
  });

  sensores.push(sensor);
  res.status(201).json(sensor);
};

export const updateSensor = (req, res) => {
  const index = sensores.findIndex(s => s.id === req.params.id);

  if (index === -1) return res.status(404).json({ error: "Sensor not found" });

  sensores[index] = { ...sensores[index], ...req.body };
  res.json(sensores[index]);
};

export const deleteSensor = (req, res) => {
  const index = sensores.findIndex(s => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Sensor not found" });

  sensores.splice(index, 1);
  res.status(204).send();
};

import { Router } from "express";
import {
  getSensores,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor
} from "../controllers/sensor.controller.js";

const router = Router();

/**
 * @swagger
 * /sensores:
 *   get:
 *     summary: Obtener todos los sensores
 *     responses:
 *       200:
 *         description: Lista de sensores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sensor'
 */
router.get("/", getSensores);

/**
 * @swagger
 * /sensores:
 *   post:
 *     summary: Crear un sensor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sensor'
 *     responses:
 *       201:
 *         description: Sensor creado
 */
router.post("/", createSensor);

/**
 * @swagger
 * /sensores/{id}:
 *   get:
 *     summary: Obtener sensor por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sensor encontrado
 */
router.get("/:id", getSensorById);

/**
 * @swagger
 * /sensores/{id}:
 *   put:
 *     summary: Actualizar un sensor
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sensor'
 *     responses:
 *       200:
 *         description: Sensor actualizado
 */
router.put("/:id", updateSensor);

/**
 * @swagger
 * /sensores/{id}:
 *   delete:
 *     summary: Eliminar sensor
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       204:
 *         description: Sensor eliminado
 */
router.delete("/:id", deleteSensor);

export default router;

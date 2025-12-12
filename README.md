# Sensor Management App

Aplicación web para la **gestión de sensores** que permite registrar, consultar, actualizar y eliminar sensores mediante una **API REST**, con una interfaz desarrollada en **React**.

La aplicación está pensada como un ejemplo sencillo de integración **Frontend + Backend**, con validaciones básicas, pruebas automáticas y buenas prácticas de desarrollo.

---

## 📌 Características principales

- Registro de sensores mediante formulario
- Visualización de sensores en tiempo real
- Eliminación de sensores desde la interfaz
- Consumo de API REST
- Validación estática con ESLint
- Pruebas end-to-end con Selenium (RPA)

---

## 📦 Estructura de un Sensor

Ejemplo de un objeto sensor:

```json
{
  "id": "c1b1e1d0-1234-5678-9999-abc123",
  "nombre": "Sensor Temp 1",
  "tipo": "Temperatura",
  "temperatura": 25.4,
  "humedad": 60.1,
  "voltaje": 3.3,
  "fecha": "2025-12-12T05:55:08.622Z"
}
Requirements for a sensor:

Example Structure:
    "id": "c1b1e1d0-1234-5678-9999-abc123",
    "nombre": "Sensor Temp 1",
    "tipo": "Temperatura",
    "temperatura": 25.4,
    "humedad": 60.1,
    "voltaje": 3.3,
    "fecha": "2025-12-12T05:55:08.622Z"

Id: Se crea un Id alfanumérico automático o creado por medio de método POST
Nombre: Nombre del sensor a ingresar
Tipo: Tipo de sensor a ingresar
Temperatura, Humedad, Voltaje: Se ingresan manualmente juntos en el ingreso del sensor
Fecha: Se ingresa de manera automática po la API

Maneja los siguientes métodos en su función:

GET /sensores
POST /sensores
GET /sensores/{id}
PUT /sensores/{id}
DELETE /sensores/{id}
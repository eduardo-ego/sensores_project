import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sensor API",
      version: "1.0.0",
      description: "API REST para gestión de sensores electrónicos"
    },
    servers: [
      {
        url: "https://glistening-motivation-production-ef86.up.railway.app/",
        description: "Servidor Produccion"
      }
    ],
    components: {
      schemas: {
        Sensor: {
          type: "object",
          required: ["nombre", "tipo"],
          properties: {
            id: {
              type: "string",
              example: "c1b1e1d0-1234-5678-9999-abc123"
            },
            nombre: {
              type: "string",
              example: "Sensor Temp 1"
            },
            tipo: {
              type: "string",
              example: "Temperatura"
            },
            temperatura: {
              type: "number",
              example: 25.4
            },
            humedad: {
              type: "number",
              example: 60.1
            },
            voltaje: {
              type: "number",
              example: 3.3
            },
            fecha: {
              type: "string",
              format: "date-time"
            }
          }
        }
      }
    }
  },
  apis: ["./routes/*.js"]
};

export const swaggerSpec = swaggerJSDoc(options);

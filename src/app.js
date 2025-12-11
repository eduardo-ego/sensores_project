import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
import sensoresRoutes from "../routes/sensor.routes.js";

const app = express();

// Obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Rutas de la API (deben ir ANTES de los archivos estáticos)
app.use("/sensores", sensoresRoutes);

// Swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, "../public")));

// Ruta catch-all para SPA - usar una función middleware en lugar de "*"
app.use((req, res, next) => {
  // Si la ruta no es de API, servir index.html
  if (!req.path.startsWith("/sensores") && !req.path.startsWith("/swagger")) {
    res.sendFile(path.join(__dirname, "../public", "index.html"), (err) => {
      if (err) {
        next(err);
      }
    });
  } else {
    next();
  }
});

export default app;
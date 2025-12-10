import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
import sensoresRoutes from "../routes/sensor.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/sensores", sensoresRoutes);

// Swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;

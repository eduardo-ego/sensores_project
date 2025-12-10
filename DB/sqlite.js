import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Ruta al archivo de la base de datos
const dbPath = path.resolve("data/sensores.db");

// ✅ Crear carpeta si no existe
const dir = path.dirname(dbPath);

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// ✅ Abrir / crear base de datos
const db = new Database(dbPath);

// ✅ Crear tabla si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS sensores (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    tipo TEXT NOT NULL,
    temperatura REAL,
    humedad REAL,
    voltaje REAL,
    created_at TEXT
  )
`).run();

export default db;

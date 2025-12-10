export default class Sensor {
  constructor({ id, nombre, tipo, temperatura, humedad, voltaje }) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.temperatura = temperatura;
    this.humedad = humedad;
    this.voltaje = voltaje;
    this.fecha = new Date();
  }
}

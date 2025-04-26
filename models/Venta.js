const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  valor: Number,
  producto: String,
  nombre: String,
  cedula: String,
  telefono: String,
  tarjeta: String,
  fecha: { type: Date, default: Date.now },
  estado: { type: String, enum: ['Aceptado', 'Declinado'], default: 'Declinado' },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
});

module.exports = mongoose.model('Venta', ventaSchema);
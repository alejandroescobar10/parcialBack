const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  rol: { type: String, enum: ['usuario', 'admin'], required: true }
});

usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('contrasena')) return next();
  this.contrasena = await bcrypt.hash(this.contrasena, 10);
  next();
});

usuarioSchema.methods.compararContrasena = function(contrasena) {
  return bcrypt.compare(contrasena, this.contrasena);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
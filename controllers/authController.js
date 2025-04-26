const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'supersecreto123';

const generarToken = (usuario) => {
  return jwt.sign({ id: usuario._id, rol: usuario.rol }, JWT_SECRET, { expiresIn: '1d' });
};

exports.registrar = async (req, res) => {
  try {
    const { nombre, correo, contrasena, rol } = req.body;
    const existe = await Usuario.findOne({ correo });
    if (existe) return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    const nuevoUsuario = new Usuario({ nombre, correo, contrasena, rol });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    const esValido = await usuario.compararContrasena(contrasena);
    if (!esValido) return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    const token = generarToken(usuario);
    res.json({ token, rol: usuario.rol });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};
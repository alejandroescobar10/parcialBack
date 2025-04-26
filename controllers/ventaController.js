const Venta = require('../models/Venta');
const Usuario = require('../models/Usuario');

exports.listarVentas = async (req, res) => {
  try {
    const ventas = await Venta.find().populate('usuarioId', 'nombre correo');
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ventas' });
  }
};

exports.actualizarEstado = async (req, res) => {
  try {
    const { id, estado } = req.body;
    const venta = await Venta.findById(id);
    if (!venta) return res.status(404).json({ mensaje: 'Venta no encontrada' });
    venta.estado = estado;
    await venta.save();
    res.json({ mensaje: 'Estado actualizado', venta });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar estado' });
  }
};

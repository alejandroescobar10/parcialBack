const Venta = require('../models/Venta');

const TARJETA_VALIDA = '1234567890123456';

exports.historialCompras = async (req, res) => {
  try {
    const ventas = await Venta.find({ usuarioId: req.usuario.id });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener compras' });
  }
};

exports.crearVenta = async (req, res) => {
  try {
    const { valor, producto } = req.body;
    const venta = new Venta({ valor, producto, usuarioId: req.usuario.id });
    await venta.save();
    res.status(201).json(venta);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear venta' });
  }
};

exports.procesarPago = async (req, res) => {
  try {
    const { idVenta, nombre, cedula, telefono, tarjeta } = req.body;
    const venta = await Venta.findById(idVenta);
    if (!venta) return res.status(404).json({ mensaje: 'Venta no encontrada' });

    venta.nombre = nombre;
    venta.cedula = cedula;
    venta.telefono = telefono;
    venta.tarjeta = tarjeta;
    venta.estado = tarjeta === TARJETA_VALIDA ? 'Aceptado' : 'Declinado';
    await venta.save();

    res.json({ mensaje: `Transacción ${venta.estado},`, venta });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al procesar pago' });
  }
};
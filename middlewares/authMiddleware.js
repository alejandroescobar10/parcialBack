const jwt = require('jsonwebtoken');

const JWT_SECRET = 'supersecreto123';

exports.proteger = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token requerido' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};
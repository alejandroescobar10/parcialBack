exports.permitirRol = (rol) => {
    return (req, res, next) => {
      if (req.usuario.rol !== rol) {
        return res.status(403).json({ mensaje: 'No autorizado' });
      }
      next();
    };
  };
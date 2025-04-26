const express = require('express');
const router = express.Router();
const { listarVentas, actualizarEstado } = require('../controllers/ventaController');
const { proteger } = require('../middlewares/authMiddleware');
const { permitirRol } = require('../middlewares/roleMiddleware');

router.use(proteger);
router.use(permitirRol('admin'));

router.get('/', listarVentas);
router.put('/', actualizarEstado);

module.exports = router;
const express = require('express');
const router = express.Router();
const { historialCompras, crearVenta, procesarPago } = require('../controllers/userController');
const { proteger } = require('../middlewares/authMiddleware');
const { permitirRol } = require('../middlewares/roleMiddleware');

router.use(proteger);
router.use(permitirRol('usuario'));

router.get('/compras', historialCompras);
router.post('/comprar', crearVenta);
router.post('/pago', procesarPago);

module.exports = router;
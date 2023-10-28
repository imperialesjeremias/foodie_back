const express = require('express');
const router = express.Router();
const restaurantController = require('../controllerrs/restaurant.controller');

router.get('/', restaurantController.getAll);
router.get('/:id', restaurantController.getById);
router.get('/:id/platos', restaurantController.getPlatos);

module.exports = router;
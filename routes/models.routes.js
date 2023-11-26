const express = require('express');
const router = express.Router();
const userController = require('../controllerrs/user.controller');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/edit', userController.editProfile);
router.get('/profile', userController.getData);
module.exports = router;
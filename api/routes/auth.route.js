const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')
const response = require('../middlewares/response.middleware')

router.post('/registration',
    authController.registration,
    response.send
    )

router.post('/login',
    authController.login,
    response.send
)

module.exports = router
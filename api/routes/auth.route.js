const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')
const response = require('../middlewares/response.middleware')
const {verifyUser} = require("../middlewares/auth.middleware");

router.put('/',
  verifyUser,
  authController.update,
  response.send
)

router.post('/registration',
  authController.registration,
  response.send
)

router.post('/login',
  authController.login,
  response.send
)

module.exports = router
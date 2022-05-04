const express = require('express');
const router = express.Router();
const response = require('../middlewares/response.middleware')
const {verifyUser} = require("../middlewares/auth.middleware");
const passwordsController = require("../controllers/passwords.controller");

router.get('/',
  verifyUser,
  passwordsController.getAll,
  response.send
)

router.post('/',
  verifyUser,
  passwordsController.create,
  response.send
)

module.exports = router
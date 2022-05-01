const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const response = require('../middlewares/response.middleware')
const {verifyUser} = require("../middlewares/auth.middleware");

router.get('/',
  verifyUser,
  usersController.getAll,
  response.send
)

router.post('/',
  verifyUser,
  usersController.create,
  response.send
)

router.get('/userNames',
  verifyUser,
  usersController.getUserNames,
  response.send
)

module.exports = router;

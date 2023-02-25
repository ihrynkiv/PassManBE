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

router.put('/',
  verifyUser,
  usersController.updateConfiguration,
  response.send
)

router.get('/userNames',
  usersController.getUserNames,
  response.send
)

router.get('/whoami',
  verifyUser,
  usersController.whoAmI,
  response.send
)

module.exports = router;

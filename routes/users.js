const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const response = require('../middlewares/response.middleware')

router.get('/',
  usersController.getAll,
    response.send
  );

module.exports = router;

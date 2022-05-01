const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const response = require('../middlewares/response.middleware')
const {verityUser} = require("../middlewares/auth.middleware");

router.get('/',
    verityUser,
    usersController.getAll,
    response.send
  );

router.post('/',
    verityUser,
    usersController.create,
    response.send
)

router.get('/userNames',
    verityUser,
    usersController.getUserNames,
    response.send
  )

module.exports = router;

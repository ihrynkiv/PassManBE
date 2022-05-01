const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const response = require('../middlewares/response.middleware')

router.get('/',
  usersController.getAll,
    response.send
  );

router.post('/',
  usersController.create,
  response.send
)

router.get('/userNames',
  usersController.getUserNames,
  response.send
  )

module.exports = router;

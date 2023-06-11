const express = require('express');
const router = express.Router();
const response = require('../middlewares/response.middleware')
const {verifyUser} = require("../middlewares/auth.middleware");
const reviewsController = require("../controllers/reviews.controller");

router.get('/',
  verifyUser,
  reviewsController.getAll,
  response.send
)

router.get('/:id',
  verifyUser,
  reviewsController.getOne,
  response.send
)

router.post('/',
  verifyUser,
  reviewsController.create,
  response.send
)

router.put('/',
  verifyUser,
  reviewsController.update,
  response.send
)

router.delete('/',
  verifyUser,
  reviewsController.delete,
  response.send
)

module.exports = router

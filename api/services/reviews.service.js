const Reviews = require("../models/reviews.model");

exports.getAll = (userId) => Reviews.findAll({where: {userId}});

exports.getOne = (prId) => Reviews.findOne({where: {prId}});

exports.create = async (review) => {
  const createdItem = await Reviews.create(review);
  return createdItem?.get();
}

exports.update = async (review) => {
  const updatedReview = await Reviews.update(review, { where: { prId: review.prId }, returning: true, plain: true})
  return updatedReview[1]
}

exports.delete = (prId) => Reviews.destroy({ where: { prId }})

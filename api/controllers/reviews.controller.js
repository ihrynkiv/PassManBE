const httpStatusCodes = require("http-status");
const reviewsService = require("../services/reviews.service");
const ErrorWithStatus = require("../../utils/ErrorWithStatus");
const {ERROR_TYPES} = require("../../config/errors");

exports.getAll = async (req, res, next) => {
  try {
    const {userId} = req.user
    const data = await reviewsService.getAll(userId)

    req.responseStatus = httpStatusCodes.OK;
    req.responseData = data
    return next()
  } catch (e) {
    return next(e)
  }
}

exports.getOne = async (req, res, next) => {
  try {
    const {id} = req.query
    const data = await reviewsService.getOne(id)

    req.responseStatus = httpStatusCodes.OK;
    req.responseData = data
    return next()
  } catch (e) {
    return next(e)
  }
}

exports.create = async (req, res, next) => {
  try {
    const {userId} = req.user
    const data = req.body
    const existedData = await reviewsService.getOne(data.prId)

    if (existedData) {
      return next(new ErrorWithStatus(
        httpStatusCodes.FORBIDDEN,
        ERROR_TYPES.validation,
        { title: "Try update" }
      ))
    }

    const createdReview = await reviewsService.create({...data, userId })
    req.responseStatus = httpStatusCodes.OK;
    req.responseData = createdReview
    return next()
  } catch (e) {
    return next(new ErrorWithStatus(
      httpStatusCodes.BAD_REQUEST,
      ERROR_TYPES.databaseError,
      { title: e.title ?? e.message }
    ))
  }
}

exports.update = async (req, res, next) => {
  try {
    const {userId} = req.user
    const data = req.body
    const updatedReview = await reviewsService.update({...data, userId })
    req.responseStatus = httpStatusCodes.OK;
    req.responseData = updatedReview
    return next()
  } catch (e) {
    console.log(e)
    return next(new ErrorWithStatus(
      httpStatusCodes.BAD_REQUEST,
      ERROR_TYPES.databaseError,
      { title: e.title ?? e.message }
    ))
  }
}

exports.delete = async (req, res, next) => {
  try {
    const {prId} = req.body
    await reviewsService.delete(prId)
    req.responseStatus = httpStatusCodes.OK;
    return next()
  } catch (e) {
    return next(new ErrorWithStatus(
      httpStatusCodes.BAD_REQUEST,
      ERROR_TYPES.databaseError,
      { title: e.title ?? e.message }
    ))
  }
}

const passwordsService = require("../services/passwords.service");
const httpStatusCodes = require("http-status");
const ErrorWithStatus = require("../../utils/ErrorWithStatus");
const {ERROR_TYPES} = require("../../config/errors");

exports.getAll = async (req, res, next) => {
  try {
    const {userId} = req.user
    const data = await passwordsService.getAll(userId)

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
    const createdPassword = await passwordsService.create({...data, userId })
    req.responseStatus = httpStatusCodes.OK;
    req.responseData = createdPassword
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
    const updatedPassword = await passwordsService.update({...data, userId })
    req.responseStatus = httpStatusCodes.OK;
    req.responseData = updatedPassword
    return next()
  } catch (e) {
    return next(new ErrorWithStatus(
      httpStatusCodes.BAD_REQUEST,
      ERROR_TYPES.databaseError,
      { title: e.title ?? e.message }
    ))
  }
}

exports.delete = async (req, res, next) => {
  try {
    const {userId} = req.user
    const {id} = req.params
    await passwordsService.delete(id, userId)
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
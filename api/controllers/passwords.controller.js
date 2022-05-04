const passwordsService = require("../services/passwords.service");
const httpStatusCodes = require("http-status");
const ErrorWithStatus = require("../../utils/ErrorWithStatus");
const {ERROR_TYPES} = require("../../config/errors");

exports.getAll = async (req, res, next) => {
  try {
    const {userId} = req.user
    const passwords = await passwordsService.getAll(userId)
    req.responseStatus = httpStatusCodes.OK;
    req.responseData = passwords
    return next()
  } catch (e) {
    return next(new ErrorWithStatus(
      httpStatusCodes.BAD_REQUEST,
      ERROR_TYPES.databaseError,
      { title: e.title ?? e.message }
    ))
  }
}

exports.create = async (req, res, next) => {
  try {
    const {userId} = req.user
    const password = req.body
    const createdPassword = await passwordsService.create({...password, userId })
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
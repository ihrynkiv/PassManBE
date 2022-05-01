const httpStatusCodes = require('http-status');
const usersService = require('../services/users.service');
const ErrorWithStatus = require("../utils/ErrorWithStatus");
const { ERROR_TYPES } = require("../config/errors");

exports.getAll = async (req, res, next) => {
  try {
    const users = await usersService.get()
    throw new Error('fuck off')
    req.responseStatus = httpStatusCodes.OK;
    req.responseData = users;
    return next()
  } catch (e) {
    return next(new ErrorWithStatus(
      httpStatusCodes.BAD_REQUEST,
      ERROR_TYPES.databaseError,
    { title: e.title ?? e.message }
    ))
  }

}
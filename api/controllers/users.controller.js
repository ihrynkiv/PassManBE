const httpStatusCodes = require('http-status');
const usersService = require('../services/users.service');
const ErrorWithStatus = require("../../utils/ErrorWithStatus");
const { ERROR_TYPES } = require("../../config/errors");

exports.getAll = async (req, res, next) => {
  try {
    const users = await usersService.getAll()
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

exports.getUserNames = async (req, res, next) => {
  try {
    const users = await usersService.getAll()
    const userNames = users.map((user) => user?.username)
    req.responseStatus = httpStatusCodes.OK;
    req.responseData = userNames;
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
    const user = req.body
    const createdUser = await usersService.create(user)
    req.responseStatus = httpStatusCodes.OK;
    req.responseData = createdUser;
    return next()
  } catch (e) {
    return next(new ErrorWithStatus(
      httpStatusCodes.BAD_REQUEST,
      ERROR_TYPES.databaseError,
      { title: e.title ?? e.message }
    ))
  }
}
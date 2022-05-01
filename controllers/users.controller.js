const httpStatusCodes = require('http-status');
const usersService = require('../services/users.service');

exports.getAll = async (res, req, next) => {
  const users = await usersService.get()

  req.responseStatus = httpStatusCodes.OK;
  req.responseData = users;
  return next()
}
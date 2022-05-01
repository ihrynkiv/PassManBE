const httpStatusCodes = require('http-status');
const ErrorWithStatus = require("../../utils/ErrorWithStatus");
exports.send = (req, res, next) => {
  const status = req.responseStatus
  const data = req.responseData

  if (!status || !data) {
    return next(new ErrorWithStatus(httpStatusCodes.NO_CONTENT, 'No content generated'));
  }

  return res.status(status).send(data);
};
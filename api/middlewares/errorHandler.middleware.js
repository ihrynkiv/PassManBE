const httpStatusCodes = require('http-status');
const ErrorWithStatus = require("../../utils/ErrorWithStatus");
const { ERROR_TYPES, ERROR_CODES } = require("../../config/errors");

// eslint-disable-next-line no-unused-vars
const errorsHandler = (error, req, res, next) => {
  //BodyParser parsing json error:
  if (error instanceof SyntaxError) {
    const { status, message, type } = error;
    if (status === httpStatusCodes.BAD_REQUEST && 'body' in error && type === ERROR_TYPES.jsonBodyParse) {
      res.status(status).json({ title: 'Problem with request body.', detail: message, type });
      return;
    }
  }

  if (error instanceof ErrorWithStatus) {
    const type = error.getType();
    const info = error.getInfo();
    const status = error.getStatus();

    res.status(status).json({ ...info, type });
  } else {
    const errorInfo = error.errors && error.errors.map((e) => e.message).join('|') || error.message;

    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        type: ERROR_TYPES.serverError,
        code: ERROR_CODES.serverError,
        title: 'Internal server error.',
        detail: `${ error.name }: ${ errorInfo }`
      });
  }
};

module.exports = errorsHandler;

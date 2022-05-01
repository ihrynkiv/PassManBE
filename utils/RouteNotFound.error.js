const httpStatusCodes = require('http-status');
const ErrorWithStatus = require("./ErrorWithStatus");
const { ERROR_TYPES, ERROR_CODES } = require("../config/errors");

class RouteNotFoundError extends ErrorWithStatus {
  constructor(url) {
    super(httpStatusCodes.NOT_FOUND,
      ERROR_TYPES.notFound,
      {
        code: ERROR_CODES.noRoute,
        title: 'No such route.',
        detail: `No such route: ${ url }.`
      }
    );
  }
}

module.exports = {
  RouteNotFoundError
};

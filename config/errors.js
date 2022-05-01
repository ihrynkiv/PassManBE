const ERROR_TYPES = {
  notFound: 'not.found',
  validation: 'validation.error',
  serverError: 'server.error',
  databaseError: 'database.error',

  reqBodyValidationError: 'req.body.validation.error',
  reqQueryValidationError: 'req.query.validation.error',
  reqHeadersValidationError: 'req.headers.validation.error',
  reqFieldsValidationError: 'req.fields.validation.error',
  reqParamValidationError: 'req.param.validation.error',

  deletionProblem: 'entity.delete.error',

  serialization: 'serialization.error',

  jsonBodyParse: 'entity.parse.failed', // <-- BodyParser constant!
};

const ERROR_CODES = {
  noConfig: 'req.no.configuration',
  invalidConfig: 'req.invalid.configuration',
  serverError: 'req.internal.server.error',
  noRoute: 'req.no.such.route',
  reqInvalidBody: 'req.invalid.body',
  reqInvalidQuery: 'req.invalid.query',
  reqInvalidHeaders: 'req.invalid.headers',
  reqInvalidFields: 'req.invalid.fields',
  reqInvalidParams: 'req.invalid.params',
};


module.exports = {
  ERROR_TYPES,
  ERROR_CODES
};
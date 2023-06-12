const { verifyUser } = require('./auth.middleware');
const ErrorWithStatus = require("../../utils/ErrorWithStatus");
const { ERROR_TYPES } = require('../../config/errors');
let req, res, next;

describe('auth.middleware', () => {
  describe('verifyUser', () => {
    beforeEach(() => {
      req = {
        header: {
          authorization: 'Bearer testTokenMock'
        }
      }
      next = jest.fn()
    })

    it('should call next in case there is a auth token', () => {
      verifyUser(req, res, next)

      expect(next).toHaveBeenCalled()
    });

    it('should call next with ErrorWithStatus in case there is no auth token', () => {
      req.header.authorization = ''

      verifyUser(req, res, next)
      expect(next).toHaveBeenCalledWith(new ErrorWithStatus(
        401,
        ERROR_TYPES.validation,
        new Error('User unauthorized')
      ))
    });
  });
});

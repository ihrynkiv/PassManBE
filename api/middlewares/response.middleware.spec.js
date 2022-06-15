const httpStatusCodes = require('http-status');

const ErrorWithStatus = require("../../utils/ErrorWithStatus");
const { send } = require('./response.middleware');

let req, res, next;
let sendMock, statusMock;

describe('response middleware', () => {
  beforeEach(() => {
    req = {};
    res = {};
    next = jest.fn();
    sendMock = jest.fn();
    statusMock = jest.fn();
  });

  describe('send', () => {
    it('should call next with Error if req target response is undefined ', () => {
      send(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new ErrorWithStatus(httpStatusCodes.NO_CONTENT, 'No content generated'));
    });

    it('should call next with Error if response status or response data is undefined ', () => {
      req = {
        target: {
          response: {}
        }
      };

      send(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new ErrorWithStatus(httpStatusCodes.NO_CONTENT, 'No content generated'));
    });
  });
});

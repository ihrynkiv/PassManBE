const httpStatusCodes = require("http-status");
const PasswordsController = require('./passwords.controller')
const PasswordsService = require('../services/passwords.service')
const ErrorWithStatus = require('../../utils/ErrorWithStatus');
const { ERROR_TYPES } = require('../../config/errors');


let req, res, next;
let getAllSpy, createSpy, updateSpy, deleteSpy;

describe('passwords.controller', () => {
  beforeEach(() => {
    next = jest.fn()
    req = {user: {userId: 1}, body: {password: 'password'}}
    res = {}
  });

  describe('getAll', () => {
    const passwordsMock = [{id: 1, password: 'password',
      url: 'https://google.com/',
      login: 'mail@mail.com'
    }]

    beforeEach(() => {
      getAllSpy = jest.spyOn(PasswordsService, 'getAll');
    })

    it('should return status OK', async () => {
      getAllSpy = getAllSpy.mockResolvedValue(passwordsMock)

      await PasswordsController.getAll(req, res, next);
      expect(req.responseStatus).toEqual(httpStatusCodes.OK)
    });

    it('should set passwordsMock as responseData', async () => {
      getAllSpy = getAllSpy.mockResolvedValue(passwordsMock)

      await PasswordsController.getAll(req, res, next);
      expect(req.responseData).toEqual(passwordsMock)
    });

    it('should call next', async () => {
      getAllSpy = getAllSpy.mockResolvedValue(passwordsMock)

      await PasswordsController.getAll(req, res, next);
      expect(next).toHaveBeenCalled()
    });

    it('should call next with Error in case of error', async () => {
      getAllSpy = getAllSpy.mockImplementation(() => {
        throw new Error('test error')
      })

      await PasswordsController.getAll(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error('test error'))
    });
  });

  describe('create', () => {
    const passwordMock = {id: 1, password: 'password',
      url: 'https://google.com/',
      login: 'mail@mail.com'
    }

    beforeEach(() => {
      createSpy = jest.spyOn(PasswordsService, 'create')
    })

    it('should return status OK', async () => {
      createSpy = createSpy.mockResolvedValue(passwordMock)

      await PasswordsController.create(req, res, next);
      expect(req.responseStatus).toEqual(httpStatusCodes.OK)
    });

    it('should set passwordsMock as responseData', async () => {
      createSpy = createSpy.mockResolvedValue(passwordMock)

      await PasswordsController.create(req, res, next);
      expect(req.responseData).toEqual(passwordMock)
    });

    it('should call next', async () => {
      createSpy = createSpy.mockResolvedValue(passwordMock)

      await PasswordsController.create(req, res, next);
      expect(next).toHaveBeenCalled()
    });

    it('should call next with Error in case of error', async () => {
      createSpy = createSpy.mockImplementation(() => {
        throw new Error('test error')
      })

      await PasswordsController.create(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new ErrorWithStatus(httpStatusCodes.BAD_REQUEST, ERROR_TYPES.databaseError, { title: 'test error' }))
    });
  });

  describe('update', () => {
    const passwordMock = {id: 1, password: 'password',
      url: 'https://google.com/',
      login: 'mail@mail.com'
    }

    beforeEach(() => {
      updateSpy = jest.spyOn(PasswordsService, 'update')
    })

    it('should return status OK', async () => {
      updateSpy = updateSpy.mockResolvedValue(passwordMock)

      await PasswordsController.update(req, res, next);
      expect(req.responseStatus).toEqual(httpStatusCodes.OK)
    });

    it('should set passwordsMock as responseData', async () => {
      updateSpy = updateSpy.mockResolvedValue(passwordMock)

      await PasswordsController.update(req, res, next);
      expect(req.responseData).toEqual(passwordMock)
    });

    it('should call next', async () => {
      updateSpy = updateSpy.mockResolvedValue(passwordMock)

      await PasswordsController.update(req, res, next);
      expect(next).toHaveBeenCalled()
    });

    it('should call next with Error in case of error', async () => {
      updateSpy = updateSpy.mockImplementation(() => {
        throw new Error('test error')
      })

      await PasswordsController.update(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new ErrorWithStatus(httpStatusCodes.BAD_REQUEST, ERROR_TYPES.databaseError, { title: 'test error' }))
    });
  });

  describe('delete', () => {
    const passwordMock = {id: 1, password: 'password',
      url: 'https://google.com/',
      login: 'mail@mail.com'
    }

    beforeEach(() => {
      deleteSpy = jest.spyOn(PasswordsService, 'delete')
      req = {...req, params: {id: 1}}
    })

    it('should return status OK', async () => {
      deleteSpy = deleteSpy.mockResolvedValue(passwordMock)

      await PasswordsController.delete(req, res, next);
      expect(req.responseStatus).toEqual(httpStatusCodes.OK)
    });

    it('should call next', async () => {
      deleteSpy = deleteSpy.mockResolvedValue(passwordMock)

      await PasswordsController.delete(req, res, next);
      expect(next).toHaveBeenCalled()
    });

    it('should call next with Error in case of error', async () => {
      deleteSpy = deleteSpy.mockImplementation(() => {
        throw new Error('test error')
      })

      await PasswordsController.delete(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new ErrorWithStatus(httpStatusCodes.BAD_REQUEST, ERROR_TYPES.databaseError, { title: 'test error' }))
    });
  });

});

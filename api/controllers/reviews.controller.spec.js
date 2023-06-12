const httpStatusCodes = require("http-status");
const ReviewsController = require('./reviews.controller')
const ReviewsService = require('../services/reviews.service')
const ErrorWithStatus = require('../../utils/ErrorWithStatus');
const { ERROR_TYPES } = require('../../config/errors');


let req, res, next;
let getAllSpy, createSpy, getOneSpy, updateSpy, deleteSpy;

describe('reviews.controller', () => {
  beforeEach(() => {
    next = jest.fn()
    req = {user: {userId: 1}, body: {configuration: {}}}
    res = {}

    getOneSpy = jest.spyOn(ReviewsService, 'getOne')
  });

  describe('getAll', () => {
    const reviewsMock = [{id: 1, configuration: {}}]

    beforeEach(() => {
      getAllSpy = jest.spyOn(ReviewsService, 'getAll');
    })

    it('should return status OK', async () => {
      getAllSpy = getAllSpy.mockResolvedValue(reviewsMock)

      await ReviewsController.getAll(req, res, next);
      expect(req.responseStatus).toEqual(httpStatusCodes.OK)
    });

    it('should set passwordsMock as responseData', async () => {
      getAllSpy = getAllSpy.mockResolvedValue(reviewsMock)

      await ReviewsController.getAll(req, res, next);
      expect(req.responseData).toEqual(reviewsMock)
    });

    it('should call next', async () => {
      getAllSpy = getAllSpy.mockResolvedValue(reviewsMock)

      await ReviewsController.getAll(req, res, next);
      expect(next).toHaveBeenCalled()
    });

    it('should call next with Error in case of error', async () => {
      getAllSpy = getAllSpy.mockImplementation(() => {
        throw new Error('test error')
      })

      await ReviewsController.getAll(req, res, next);
      expect(next).toHaveBeenCalledWith(new Error('test error'))
    });
  });

  describe('create', () => {
    const reviewMock = {id: 1, configuration: {}}

    beforeEach(() => {
      createSpy = jest.spyOn(ReviewsService, 'create')
      getOneSpy = getOneSpy.mockResolvedValue(null)
    })

    it('should return status OK', async () => {
      createSpy = createSpy.mockResolvedValue(reviewMock)

      await ReviewsController.create(req, res, next);
      expect(req.responseStatus).toEqual(httpStatusCodes.OK)
    });

    it('should set passwordsMock as responseData', async () => {
      createSpy = createSpy.mockResolvedValue(reviewMock)

      await ReviewsController.create(req, res, next);
      expect(req.responseData).toEqual(reviewMock)
    });

    it('should call next', async () => {
      createSpy = createSpy.mockResolvedValue(reviewMock)

      await ReviewsController.create(req, res, next);
      expect(next).toHaveBeenCalled()
    });

    it('should call next with Error in case of error', async () => {
      createSpy = createSpy.mockImplementation(() => {
        throw new Error('test error')
      })

      await ReviewsController.create(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new ErrorWithStatus(httpStatusCodes.BAD_REQUEST, ERROR_TYPES.databaseError, { title: 'test error' }))
    });
  });

  describe('update', () => {
    const reviewMock = {id: 1, configuration: {}}

    beforeEach(() => {
      updateSpy = jest.spyOn(ReviewsService, 'update')
    })

    it('should return status OK', async () => {
      updateSpy = updateSpy.mockResolvedValue(reviewMock)

      await ReviewsController.update(req, res, next);
      expect(req.responseStatus).toEqual(httpStatusCodes.OK)
    });

    it('should set passwordsMock as responseData', async () => {
      updateSpy = updateSpy.mockResolvedValue(reviewMock)

      await ReviewsController.update(req, res, next);
      expect(req.responseData).toEqual(reviewMock)
    });

    it('should call next', async () => {
      updateSpy = updateSpy.mockResolvedValue(reviewMock)

      await ReviewsController.update(req, res, next);
      expect(next).toHaveBeenCalled()
    });

    it('should call next with Error in case of error', async () => {
      updateSpy = updateSpy.mockImplementation(() => {
        throw new Error('test error')
      })

      await ReviewsController.update(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new ErrorWithStatus(httpStatusCodes.BAD_REQUEST, ERROR_TYPES.databaseError, { title: 'test error' }))
    });
  });

  describe('delete', () => {
    const reviewMock = {id: 1, configuration: {}}

    beforeEach(() => {
      deleteSpy = jest.spyOn(ReviewsService, 'delete')
      req = {...req, params: {id: 1}}
    })

    it('should return status OK', async () => {
      deleteSpy = deleteSpy.mockResolvedValue(reviewMock)

      await ReviewsController.delete(req, res, next);
      expect(req.responseStatus).toEqual(httpStatusCodes.OK)
    });

    it('should call next', async () => {
      deleteSpy = deleteSpy.mockResolvedValue(reviewMock)

      await ReviewsController.delete(req, res, next);
      expect(next).toHaveBeenCalled()
    });

    it('should call next with Error in case of error', async () => {
      deleteSpy = deleteSpy.mockImplementation(() => {
        throw new Error('test error')
      })

      await ReviewsController.delete(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new ErrorWithStatus(httpStatusCodes.BAD_REQUEST, ERROR_TYPES.databaseError, { title: 'test error' }))
    });
  });

});

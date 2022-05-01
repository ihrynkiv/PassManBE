const jwt = require('jsonwebtoken')
const {jwt_key} = require("../../config/vars");
const ErrorWithStatus = require("../../utils/ErrorWithStatus");
const httpStatusCodes = require("http-status");
const {ERROR_TYPES} = require("../../config/errors");

exports.verityUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            throw Error('User unauthorized')
        }
        req.user = jwt.verify(token, jwt_key)
        next()
    } catch (e) {
        return next(
            new ErrorWithStatus(
                httpStatusCodes.UNAUTHORIZED,
                ERROR_TYPES.validation,
                { title: e.title ?? e.message }
            ))
    }
};
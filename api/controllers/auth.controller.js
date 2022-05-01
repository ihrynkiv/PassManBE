const UserService = require('../services/users.service')
const httpStatusCodes = require("http-status");
const ErrorWithStatus = require("../../utils/ErrorWithStatus");
const {ERROR_TYPES} = require("../../config/errors");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const {jwt_key} = require("../../config/vars");

const getAccessToken = (userId, username) => {
    const payload = {
        userId,
        username
    }
    return jwt.sign(payload, jwt_key, {expiresIn: "24h"})
}

exports.registration = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const hashPassword = bcrypt.hashSync(password, 6)
        const createdUser = await UserService.create({ username, password: hashPassword })
        req.responseStatus = httpStatusCodes.OK;
        req.responseData = createdUser;
        return next()
    } catch (e) {
        return next(
            new ErrorWithStatus(
                httpStatusCodes.BAD_REQUEST,
                ERROR_TYPES.databaseError,
                { title: e.title ?? e.message }
        ))
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body

        const user = await UserService.find({ username })
        if (!user) {
            throw new Error('Username not found')
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if(!isPasswordValid) {
            throw new Error('Wrong password')
        }

        const token = getAccessToken(user.id, user.username)
        req.responseStatus = httpStatusCodes.OK;
        req.responseData = token;
        return next()
    } catch (e) {
        return next(
            new ErrorWithStatus(
                httpStatusCodes.UNAUTHORIZED,
                ERROR_TYPES.validation,
                { title: e.title ?? e.message }
            ))
    }
}
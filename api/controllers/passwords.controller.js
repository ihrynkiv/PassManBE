const passwordsService = require("../services/passwords.service");
const httpStatusCodes = require("http-status");
const ErrorWithStatus = require("../../utils/ErrorWithStatus");
const {ERROR_TYPES} = require("../../config/errors");
const {aes_key} = require("../../config/vars");
const {encrypt, decrypt} = require("crypto-js/aes");
const CryptoJS = require("crypto-js");

exports.getAll = async (req, res, next) => {
  try {
    const {userId} = req.user
    const data = await passwordsService.getAll(userId)

    data.forEach((passwordEntity, i) => {
      const bytes = decrypt(passwordEntity.password, aes_key);
      data[i].password = bytes.toString(CryptoJS.enc.Utf8)
    })

    req.responseStatus = httpStatusCodes.OK;
    req.responseData = data
    return next()
  } catch (e) {
    return next(e)
  }
}

exports.create = async (req, res, next) => {
  try {
    const {userId} = req.user
    const data = req.body
    const hashPassword = encrypt(data.password, aes_key).toString()
    const createdPassword = await passwordsService.create({...data, password: hashPassword, userId })
    req.responseStatus = httpStatusCodes.OK;
    req.responseData = createdPassword
    return next()
  } catch (e) {
    return next(new ErrorWithStatus(
      httpStatusCodes.BAD_REQUEST,
      ERROR_TYPES.databaseError,
      { title: e.title ?? e.message }
    ))
  }
}
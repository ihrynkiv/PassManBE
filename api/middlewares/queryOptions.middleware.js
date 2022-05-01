exports.set = (options) => (req, res, next) => {
  req.query.options = options
  return next()
}
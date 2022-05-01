exports.send = (req, res, next) => {
  const status = req.responseStatus
  const data = req.responseData

  return res.status(status).send(data);
};
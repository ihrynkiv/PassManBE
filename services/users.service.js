const Users = require("../models/users.model");

exports.get = () => {
  return Users.findAll()
};
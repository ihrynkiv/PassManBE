const Users = require("../models/users.model");

exports.getAll = (options) => Users.findAll(options);

exports.find = (options) => Users.findOne({
  where: options
})

exports.create = async (user) => {
  const createdUser = await Users.create(user);
  return createdUser?.get();
}
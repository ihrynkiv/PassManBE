const Users = require("../models/users.model");

exports.getAll = (options) => Users.findAll(options);

exports.find = (options) => Users.findOne({
  where: options
})

exports.create = async (user) => {
  const createdUser = await Users.create(user);
  return createdUser?.get();
}

exports.update = async (userId, data) => {
  const updatedData = await Users.update(data, {where: {id: userId}, returning: true, plain: true})
  return updatedData[1]
}

const Users = require("../models/users.model");

exports.getAll = (options) => Users.findAll(options);

exports.find = (options) => Users.findOne({
  where: options
})

exports.create = async (user) => {
  const createdDashboard = await Users.create(user);
  return createdDashboard?.get();
}
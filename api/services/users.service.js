const Users = require("../models/users.model");

exports.getAll = (options) => {
  return Users.findAll(options)
};

exports.create = async (user) => {
  const createdDashboard = await Users.create(user);
  return createdDashboard?.get();
}
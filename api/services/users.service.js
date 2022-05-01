const Users = require("../models/users.model");

exports.getAll = () => {
  return Users.findAll()
};

exports.create = async (user) => {
  const createdDashboard = await Users.create(user);
  return createdDashboard?.get();
};
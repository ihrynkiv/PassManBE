const Passwords = require("../models/passwords.model");

exports.getAll = (userId) => Passwords.findAll({where: {userId}});

exports.create = async (password) => {
  const createdPassword = await Passwords.create(password);
  return createdPassword?.get();
}

exports.update = (password) => Passwords.update(password, { where: { id: password.id }})

exports.delete = (id, userId) => Passwords.destroy({ where: { id, userId }})
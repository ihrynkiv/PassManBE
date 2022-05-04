const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://vanya:root@localhost:5432/passman');

const Passwords = sequelize.define('passwords', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userId:{
    type: 'integer',
    notNull: true,
    references: 'users',
  },
  name: {
    type: DataTypes.STRING,
    notNull: true
  },
  username: {
    type: DataTypes.STRING,
    notNull: true,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    notNull: true
  },
  url: {
    type: DataTypes.STRING,
    notNull: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('NOW')
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('NOW')
  },
}, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

Passwords.associate = (models) => {
  const Users = models['users'];

  Passwords.hasOne(Users, {
    foreignKey: 'id',
    onDelete: 'CASCADE',
  });
};

module.exports = Passwords

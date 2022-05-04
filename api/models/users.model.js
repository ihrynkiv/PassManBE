const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://vanya:root@localhost:5432/passman');

  const Users = sequelize.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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

  Users.associate = (models) => {
    const Passwords = models['passwords'];

    Users.hasMany(Passwords, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

module.exports = Users

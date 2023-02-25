const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://andrii:root@localhost:5432/check-list');

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
    configuration:{
      type:  DataTypes.JSON,
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
    const Items = models['items'];
    const Tabs = models['tabs'];
    const Reviews = models['review'];

    Users.hasMany(Items, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Users.hasMany(Tabs, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Users.hasMany(Reviews, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

module.exports = Users

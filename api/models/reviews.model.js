const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://andrii:root@localhost:5432/check-list');

const Reviews = sequelize.define('reviews', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  prId:{
    type: DataTypes.STRING,
    unique: true,
  },
  userId:{
    type: 'integer',
    notNull: true,
    references: 'users',
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

Reviews.associate = (models) => {
  const Users = models['users'];
  // const Items = models['items'];

  Reviews.hasOne(Users, {
    foreignKey: 'id',
    onDelete: 'CASCADE',
  });

  // Reviews.hasOne(Items, {
  //   foreignKey: 'id',
  //   onDelete: 'CASCADE',
  // });
};

module.exports = Reviews

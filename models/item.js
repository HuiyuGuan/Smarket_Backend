const Sequelize = require('sequelize');
const database = require('./database');
const User = require('./user'); // Assuming you have a User model

const Item = database.define('Item', {
  item_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    notEmpty: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  price: {
    type: Sequelize.REAL,
    allowNull: false,
    notEmpty: true,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: true,
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
  },
  seller: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    references: {
      model: User,  // Links to the User model
      key: 'username', // Links to the 'username' column in User
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  description: {
    type: Sequelize.TEXT,
  },
}, {
  tableName: 'items', // Define the table name explicitly if necessary
  timestamps: true,
});

// Define the association between Item and User models
Item.belongsTo(User, { foreignKey: 'seller' });  // Explicitly set 'seller' as the foreign key

module.exports = Item;

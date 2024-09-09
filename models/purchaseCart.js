const { DataTypes } = require('sequelize');
const database = require('./database');

const PurchaseCart = database.define('PurchaseCart', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,  // Part of composite key
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,  // Part of composite key
    references: {
      model: 'Items',  // Foreign key reference to the Items table
      key: 'item_id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  item_price: {
    type: DataTypes.REAL,
    allowNull: false,
  },
  item_image: {
    type: DataTypes.TEXT,
    defaultValue: 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: 'purchaseCarts',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['username', 'item_id'],  // Composite key must remain unique
    },
  ],
});

module.exports = PurchaseCart;

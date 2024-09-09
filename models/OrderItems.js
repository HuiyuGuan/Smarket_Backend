const { DataTypes } = require('sequelize');
const database = require('./database');

const OrderItems = database.define('OrderItems', {
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'orders',  // Reference to the Orders table
        key: 'order_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      primaryKey: true,
    },
    item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'items',  // Reference to the Items table
        key: 'item_id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  }, {
    tableName: 'OrderItems',
    timestamps: true,
  });

  module.exports = OrderItems;
  
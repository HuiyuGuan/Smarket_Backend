const Sequelize = require('sequelize');
const database = require("./database");

const OrderItems = database.define('OrderItems', {
  order_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'orders', // Reference to the Order model
      key: 'order_id'
    },
    allowNull: false
  },
  item_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'items', // Reference to the Item model
      key: 'item_id'
    },
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'OrderItems'
});

module.exports = OrderItems;

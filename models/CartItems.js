const { DataTypes } = require('sequelize');
const database = require('./database');  // Your Sequelize instance

const CartItems = database.define('CartItems', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'purchaseCarts',  // References composite key in purchaseCarts
      key: 'username',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'purchaseCarts',  // References composite key in purchaseCarts
      key: 'item_id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: 'cartItems',
  timestamps: true,
  primaryKey: false,  // Disable default primary key
});

// Set composite primary key
CartItems.removeAttribute('id');  // Remove the default id field
CartItems.primaryKeyAttributes = ['username', 'item_id'];  // Set composite primary key

module.exports = CartItems;

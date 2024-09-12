const User = require('./user');
const Item = require('./item');
const database = require('./database');
const Order = require('./order');
const Category = require('./category');
const SellingList = require('./selllingList');
const PurchaseCart = require('./purchaseCart');
const Feedback = require('./feedback');
const CartItems = require('./CartItems');
const OrderItems = require('./OrderItems');

// User and Item Relationship (One-to-Many)
User.hasMany(Item, { foreignKey: 'seller' });  // Specify 'username' as the foreign key
Item.belongsTo(User, { foreignKey: 'seller' });  // Specify 'username' as the foreign key

// User and Order Relationship (One-to-Many)
User.hasMany(Order, { foreignKey: 'username' });
Order.belongsTo(User, { foreignKey: 'username' });

// User and PurchaseCart Relationship (One-to-One)
User.hasOne(PurchaseCart, { foreignKey: 'username' });
PurchaseCart.belongsTo(User, { foreignKey: 'username' });

// User and Feedback Relationship (One-to-Many)
User.hasMany(Feedback, { foreignKey: 'username' });
Feedback.belongsTo(User, { foreignKey: 'username' });

// Item and Feedback Relationship (One-to-Many)
Item.hasMany(Feedback, { foreignKey: 'item_id' });
Feedback.belongsTo(Item, { foreignKey: 'item_id' });

// Item and Category Relationship (One-to-Many)
Category.hasMany(Item, { foreignKey: 'category_id' });
Item.belongsTo(Category, { foreignKey: 'category_id' });

// Item and Order Many-to-Many Relationship via OrderItems
Item.belongsToMany(Order, {
  through: OrderItems,
  foreignKey: 'item_id',  // References item_id in OrderItems
  otherKey: 'order_id',   // References order_id in OrderItems
});
Order.belongsToMany(Item, {
  through: OrderItems,
  foreignKey: 'order_id',  // References order_id in OrderItems
  otherKey: 'item_id',     // References item_id in OrderItems
});

// OrderItems model
Order.hasMany(OrderItems, { foreignKey: 'order_id', as: 'orderItems' });
OrderItems.belongsTo(Order, { foreignKey: 'order_id', as: 'orderItems' });

// Item model association with OrderItems
OrderItems.belongsTo(Item, { foreignKey: 'item_id', as: 'item' });
Item.hasMany(OrderItems, { foreignKey: 'item_id', as: 'orderItems' });


// PurchaseCart and Item Many-to-Many Relationship via CartItems
PurchaseCart.belongsToMany(Item, {
  through: CartItems,
  foreignKey: 'username',  // References username in CartItems
  otherKey: 'item_id',     // References item_id in CartItems
});
Item.belongsToMany(PurchaseCart, {
  through: CartItems,
  foreignKey: 'item_id',   // References item_id in CartItems
  otherKey: 'username',    // References username in CartItems
});

module.exports = {
  Item,
  User,
  database,
  Order,
  Category,
  SellingList,
  PurchaseCart,
  Feedback,
  CartItems,
  OrderItems
};

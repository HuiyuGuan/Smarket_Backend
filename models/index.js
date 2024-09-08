const User = require('./user');
const Item = require('./item');
const database = require('./database');
const Order = require('./order');
const Category = require('./category');
const SellingList = require('./selllingList');
const PurchaseCart = require('./purchaseCart');
const Feedback = require('./feedback');


User.hasMany(Item)
Item.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasOne(PurchaseCart)
PurchaseCart.belongsTo(User)

User.hasMany(Feedback)
Feedback.belongsTo(User)

Item.hasMany(Feedback)
Feedback.belongsTo(Item)
//many to many or one to many?
// Order.hasMany(Item)
// Item.belongsTo(Order)

Item.belongsToMany(PurchaseCart)
PurchaseCart.belongsToMany(Item)

Category.hasMany(Item)
Item.belongsTo(Category)

Order.belongsTo(User, {foreignKey: 'username', as: 'user'}); 
// Order.belongsTo(Item, {foreignKey: 'item_id', as: 'item'});
Order.belongsToMany(Item, { through: 'OrderItems' })

module.exports = {
    Item,
    User,
    database,
    Order,
    Category,
    SellingList,
    PurchaseCart,
    Feedback

}
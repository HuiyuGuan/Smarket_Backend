const Sequelize = require('sequelize')
const database = require("./database")

const order = database.define('order' ,{
    //order_id, username, item_id, order_date, amount
    order_id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        notEmpty: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull:false,
        notEmpty: true
    },
    item_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        notEmpty: true
    },
    order_date: {
        type: Sequelize.DATE,
        allowNull:false,
        notEmpty: true
    },
    total: {
        type: Sequelize.REAL,
        allowNull:false,
        notEmpty: true
    }
})

module.exports = order;

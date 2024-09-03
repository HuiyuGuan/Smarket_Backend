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
    item_name: {
        type: Sequelize.STRING,
        allowNull:false,
        notEmpty: true
    },
    item_image: {
        type: Sequelize.TEXT,
        defaultValue : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg",
    },
    total: {
        type: Sequelize.REAL,
        allowNull:false,
        notEmpty: true
    },

    item_seller: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
})

module.exports = order;

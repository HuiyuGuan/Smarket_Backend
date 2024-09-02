const Sequelize = require('sequelize')
const database = require("./database")

const item = database.define('item' ,{
    //item_id, name, price, stock, image, seller, description
    item_id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull : false,
        primaryKey : true,
        notEmpty: true
    },
    name : {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    price : {
        type: Sequelize.REAL,
        allowNull: false,
        notEmpty: true
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: true
    },
    image: {
        type: Sequelize.TEXT,
        defaultValue : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg",
    },
    seller: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    },
    description: {
        type: Sequelize.TEXT,
    },
})

module.exports = item;
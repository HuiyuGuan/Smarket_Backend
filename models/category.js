const Sequelize = require('sequelize')
const database = require("./database")

const category = database.define('category' ,{
    //category_id, item_id, category_name
    category_id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        notEmpty: true
    },
    item_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: true
    },
    category_name : {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true
    }
})

module.exports = category;
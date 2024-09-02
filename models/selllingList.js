const Sequelize = require('sequelize')
const database = require("./database")

const sellingList = database.define('sellingList' ,{
    //username, item_id
    username : {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        notEmpty: true
    },
    item_id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: true
    }
})

module.exports = sellingList;
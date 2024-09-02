const Sequelize = require('sequelize')
const database = require("./database")

const feedback = database.define('feedback' ,{

    feedbackId :{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull : false,
        primaryKey : true,
        notEmpty: true
    },
    item_id : {
        type: Sequelize.INTEGER,
        allowNull : false,
        notEmpty: true
    },
    username : {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        notEmpty: true
    },

    review : {
        type: Sequelize.STRING,
        allowNull: true,
    },

    rating : {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
})

module.exports = feedback;


const Sequelize = require('sequelize');
const database = require('./database');

const Order = database.define('order', {
    order_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    item_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    item_image: {
        type: Sequelize.TEXT,
        defaultValue: "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
    },
    total: {
        type: Sequelize.REAL,
        allowNull: false
    },
    item_seller: {
        type: Sequelize.STRING,
        allowNull: false
    },
    order_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
    tableName: 'orders' // Specifies custom table name if needed
});

module.exports = Order;

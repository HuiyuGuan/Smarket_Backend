const Sequelize = require('sequelize');
const database = require("./database");

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
    total: {
        type: Sequelize.REAL,
        allowNull: false
    },
    order_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: true,
    tableName: 'orders'
});

module.exports = Order;

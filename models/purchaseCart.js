const Sequelize = require("sequelize");
const database = require("./database");

const PurchaseCart = database.define(
  "purchaseCart",
  {
    item_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    item_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    item_price: {
      type: Sequelize.REAL,
      allowNull: false,
    },
    item_image: {
      type: Sequelize.TEXT,
      defaultValue:
        "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg",
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "purchaseCarts", // Ensure this matches your actual table name
    timestamps: true, // Ensure this matches your model schema
  }
);

module.exports = PurchaseCart;

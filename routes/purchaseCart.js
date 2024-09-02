const router = require("express").Router();
const PurchaseCart = require("../models/purchaseCart");
const database = require("../models/database");

// GET all cart items
router.get("/", async (req, res) => {
  try {
    const { username } = req.query; // Expecting username as a query parameter
    if (!username) {
      return res.status(400).send("Username query parameter is required.");
    }
    const purchaseCarts = await PurchaseCart.findAll({ where: { username } });
    if (!purchaseCarts.length) {
      return res.status(404).send("No items found for this user.");
    }
    res.status(200).json(purchaseCarts);
  } catch (error) {
    res.status(500).send("Error fetching cart items: " + error.message);
  }
});
// POST a new item to the cart
// router.post("/", async (req, res) => {
//   try {
//     const newPurchaseCart = await PurchaseCart.create(req.body);
//     res.status(201).json(newPurchaseCart);
//   } catch (error) {
//     res.status(400).send(`Failed to add item to cart: ${error.message}`);
//   }
// });
router.post("/", async (req, res) => {
  try {
    const newPurchaseCart = await PurchaseCart.create(req.body);
    res.status(201).json(newPurchaseCart);
  } catch (error) {
    res.status(500).send("Error adding item to cart: " + error.message);
  }
});

// DELETE an item from the cart by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await PurchaseCart.destroy({ where: { id } });
    res.status(200).json({ message: `Deleted item with id ${id}.` });
  } catch (error) {
    res.status(500).send("Error deleting item from cart: " + error.message);
  }
});

module.exports = router;

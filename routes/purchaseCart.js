const router = require("express").Router();
const PurchaseCart = require("../models/purchaseCart");
const database = require("../models/database");
const cartItems = require("../models/CartItems")
// GET all cart items
router.get('/purchaseCarts', async (req, res) => {
  const { item_id, username } = req.query;

  try {
    // Check if the item already exists in the purchase cart
    const cartItem = await PurchaseCart.findOne({
      where: {
        item_id: item_id,
        username: username,
      },
    });

    if (cartItem) {
      res.status(200).json(cartItem);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error checking cart' });
  }
});
router.put('/purchaseCarts/:item_id', async (req, res) => {
  const { item_id } = req.params;
  const { quantity } = req.body;

  try {
    const cartItem = await PurchaseCart.findOne({ where: { item_id: item_id } });

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();  // Save the updated quantity
      res.status(200).json(cartItem);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating cart item' });
  }
});
router.post('/purchaseCarts', async (req, res) => {
  const { item_id, username, item_name, item_price, item_image, quantity } = req.body;

  try {
    const newCartItem = await PurchaseCart.create({
      item_id,
      username,
      item_name,
      item_price,
      item_image,
      quantity,
    });
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(500).json({ error: 'Error adding item to cart' });
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

const router = require("express").Router();
const PurchaseCart = require("../models/purchaseCart");

// GET all cart items or specific items by item_id and username
router.get('/purchaseCarts', async (req, res) => {
  console.log('GET request received for /purchaseCarts', req.query);
  const { item_id, username } = req.query;

  try {
    // If both item_id and username are provided, find the specific cart item
    if (item_id && username) {
      const cartItem = await PurchaseCart.findOne({ where: { item_id, username } });

      if (cartItem) {
        return res.status(200).json(cartItem);
      } else {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
    }

    // If only username is provided, fetch all cart items for that user
    if (username) {
      const cartItems = await PurchaseCart.findAll({ where: { username } });

      if (cartItems.length > 0) {
        return res.status(200).json(cartItems);
      } else {
        return res.status(404).json({ message: 'No items found in cart for this user' });
      }
    }

    // If no query parameters, return all cart items (for testing)
    const allCartItems = await PurchaseCart.findAll();

    if (allCartItems.length > 0) {
      return res.status(200).json(allCartItems);
    } else {
      return res.status(404).json({ message: 'No items found in cart' });
    }

  } catch (error) {
    return res.status(500).json({ error: 'Error fetching cart items: ' + error.message });
  }
});


// PUT (Update) quantity for a specific item in the cart
router.put('/purchaseCarts/:username/:item_id', async (req, res) => {
  const { username, item_id } = req.params;
  const { quantity } = req.body;

  try {
    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Quantity must be greater than 0' });
    }

    const cartItem = await PurchaseCart.findOne({ where: { username, item_id } });

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.status(200).json(cartItem);
    } else {
      res.status(404).json({ message: 'Item not found in cart for this user' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating cart item: ' + error.message });
  }
});

// DELETE an item from the cart using username and item_id
router.delete("/purchaseCarts/:username/:item_id", async (req, res) => {
  const { username, item_id } = req.params;

  try {
    const deleted = await PurchaseCart.destroy({ where: { username, item_id } });
    
    if (deleted) {
      res.status(200).json({ message: `Deleted item with item_id ${item_id} for user ${username}.` });
    } else {
      res.status(404).json({ message: `Item not found in cart for user ${username} with item_id ${item_id}.` });
    }
  } catch (error) {
    res.status(500).send("Error deleting item from cart: " + error.message);
  }
});

module.exports = router;

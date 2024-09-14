const router = require("express").Router();
const PurchaseCart = require("../models/purchaseCart");
const database = require("../models/database");

router.get('/', async (req, res) => {
  const { item_id, username } = req.query;

  try {
    if (item_id && username) {
      const cartItem = await PurchaseCart.findOne({ where: { item_id, username } });

      if (cartItem) {
        return res.status(200).json(cartItem);
      } else {
        return res.status(404).json({ message: 'Item not found in cart' });
      }
    }

    if (username) {
      const cartItems = await PurchaseCart.findAll({ where: { username } });

      if (cartItems.length > 0) {
        return res.status(200).json(cartItems);
      } else {
        return res.status(404).json({ message: 'No items found in cart for this user' });
      }
    }

    const allCartItems = await PurchaseCart.findAll();
    return res.status(200).json(allCartItems);

  } catch (error) {
    return res.status(500).json({ error: 'Error fetching cart items: ' + error.message });
  }
});


// PUT (Update) quantity for a specific item in the cart
router.put('/:username/:item_id', async (req, res) => {
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
router.delete("/:username/:item_id", async (req, res) => {
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

// POST route to add an item to the purchase cart
router.post('/', async (req, res) => {
  const { username, item_id, item_name, item_price, item_image, quantity } = req.body;

  try {
    // Check if the item already exists in the cart for the given user
    const existingCartItem = await PurchaseCart.findOne({
      where: { username, item_id }
    });

    if (existingCartItem) {
      // If the item already exists, you might want to increase its quantity instead
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json(existingCartItem);
    }

    // If the item doesn't exist, add it as a new cart item
    const newCartItem = await PurchaseCart.create({
      username,
      item_id,
      item_name,
      item_price,
      item_image,
      quantity,
    });

    res.status(201).json(newCartItem);
  } catch (error) {
    console.error('Error adding item to cart:', error.message);
    res.status(500).json({ error: 'Error adding item to cart: ' + error.message });
  }
});

module.exports = router;

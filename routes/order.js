const express = require('express');
const { Order, PurchaseCart, Item, User } = require('../models');
const router = express.Router();

router.post('/create', async (req, res) => {
  const { userId, items } = req.body;

  try {
    // Calculate total cost and create the order
    const total = items.reduce((sum, item) => sum + item.item_price * item.quantity, 0);
    const newOrder = await Order.create({
      userId,
      total,
      status: 'completed',
    });

    // Link items to the order
    await Promise.all(items.map(async (item) => {
      await newOrder.addItem(item.item_id, { through: { quantity: item.quantity } });
    }));

    // Clear the user's cart after order
    await PurchaseCart.destroy({ where: { userId } });

    res.status(200).send({ message: 'Order successfully created', orderId: newOrder.id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Order creation failed' });
  }
});

module.exports = router;

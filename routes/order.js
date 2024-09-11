const express = require('express');
const { Order, PurchaseCart, Item } = require('../models');
const OrderItems = require('../models/OrderItems');
const router = express.Router();
const { Sequelize } = require('sequelize');

// Route to create a new order
router.post('/create', async (req, res) => {
  const { username, items } = req.body; // Expecting an array of items in the request

  try {
    if (!username || !items || items.length === 0) {
      return res.status(400).json({ message: 'Invalid request, missing username or items' });
    }

    // Step 1: Create the order in the orders table (without item_id)
    const total = items.reduce((sum, item) => sum + item.item_price * item.quantity, 0);
    const newOrder = await Order.create({
      username,
      total,
      order_date: new Date(),
    });

    // Step 2: Insert each item into the OrderItems table
    await Promise.all(items.map(async (item) => {
      await OrderItems.create({
        order_id: newOrder.order_id,  // Link to the newly created order
        item_id: item.item_id,        // Link to the item being ordered
        quantity: item.quantity,      // Quantity for this item
      });
    }));

    res.status(200).json({ message: 'Order created successfully', orderId: newOrder.order_id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Order creation failed', error });
  }
});

// Route to get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

router.get('/:username', async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { username: req.params.username } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

// Get details of a specific order
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { order_id: req.params.orderId },
      include: [Item]  // Include associated items
    });
    console.log('Order:', order); 
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order details', error });
  }
});
module.exports = router;

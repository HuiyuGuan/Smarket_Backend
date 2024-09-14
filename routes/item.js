const router = require("express").Router();
const Item = require("../models/item");
const database = require("../models/database");

router.get("/", async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).send(items);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/items/:item_id", async (req, res) => {
  try {
    console.log(`Fetching item with item_id: ${req.params.item_id}`);
    const item = await Item.findOne({ where: { item_id: req.params.item_id } });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.json(newItem);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:item_id", async (req, res) => {
  try {
    const inputid = req.params.item_id;
    await Item.destroy({ where: { item_id: inputid } });
    res.status(200).json({
      outcome: `Deleted item with id ${inputid}.`,
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/", async (req, res) => {
  try {
    const updateItem = await Item.update(req.body, {
      where: { item_id: req.body.item_id },
      returning: true,
    });
    res.status(200).json({
      newData: updateItem[1][0].dataValues,
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/bulk", async (req, res) => {
  try {
    const items = req.body; // Expecting an array of item objects
    if (!Array.isArray(items)) {
      return res
        .status(400)
        .json({ error: "Request body must be an array of items." });
    }

    // Create multiple items in bulk
    const newItems = await Item.bulkCreate(items, { validate: true });
    res.status(201).json(newItems);
  } catch (error) {
    console.error("Error creating items:", error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;

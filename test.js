const Item = require("./models/item"); // Adjust the path if necessary

async function testCRUD() {
  try {
    // Create
    const newItem = await Item.create({
      name: "Sample Item",
      price: 19.99,
      stock: 100,
      seller: "Sample Seller",
      description: "This is a sample item.",
    });
    console.log("Item added:", newItem.toJSON());

    // Read
    const items = await Item.findAll();
    console.log(
      "All items:",
      items.map((item) => item.toJSON())
    );

    // Update
    newItem.name = "Updated Item Name";
    await newItem.save();
    console.log("Item updated:", newItem.toJSON());

    // Delete
    await newItem.destroy();
    console.log("Item deleted.");
  } catch (error) {
    console.error("Error during CRUD operations:", error);
  }
}

testCRUD();

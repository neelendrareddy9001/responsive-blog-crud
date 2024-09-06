import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./model/ProductModel.js";

dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/products", async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ sucess: false, message: "Please provided all fields" });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ sucess: true, data: newProduct });
  } catch (error) {
    console.log("Error in Create Product:", error.message);
    res.status(500).json({ sucess: false, message: "Sever Error" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
    const {id} = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ sucess: true, message: "Product deleted" });
  } catch (error) {
    res.status(404).json({sucess: false, message: "Product not found"})
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("server started at http://localhost:5000");
});

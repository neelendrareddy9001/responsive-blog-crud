import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./model/ProductModel.js";
import mongoose from "mongoose";


dotenv.config();

const app = express();

app.use(express.json());


//update a product
app.put("/api/products", async (req,res) => {
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({sucess: false, message: "incorrect"})
    }
    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product,{new: true});
        res.status(200).json({sucess: true, data: updateProduct})
    } catch(error) {
        res.status(500).json({sucess: false, message: "server Error"})
    }
})

//get all the products
app.get("/api/products", async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({sucess: true, data: products})
    } catch(error) {
        console.log("Error in fetching products:" , error.message)
        res.status(500).json({sucess: false, message: "server Error"})
    }
} )

//create a product
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


//delete a product
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

const express = require("express");
const mongoose = require("mongoose");
const { DB_URI } = require("./constants/constants");
const connectDB = require("./db/db");
const products = require("./data/products");
const Product = require("./models/product");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productExists = async (product) => {
  const result = await Product.findOne({ title: product.title });
  if (result) {
    return true;
  }
  return false;
};

const saveProducts = (products) => {
  products.forEach(async (product) => {
    try {
      if (!(await productExists(product))) {
        const newProduct = new Product(product);
        await newProduct.save();
      }
    } catch (err) {
      console.log("Error in saving product");
    }
  });
};

saveProducts(products);

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).exec();
  res.json(product);
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price } = req.body;

  const updatedDocument = await Product.findByIdAndUpdate(
    id,
    { title, price },
    { new: true }
  );

  res.json(updatedDocument);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);

  res.json({
    deletedProduct,
    message: "deleted successfully",
  });
});

app.post("/products", async (req, res) => {
  const { title, price, description } = req.body;

  const newProduct = new Product({ title, price, description });

  if (!(await productExists(newProduct))) {
    await newProduct.save();
    console.log("product save successfully");
  } else {
    console.log("Product already exists");
  }

  res.json(newProduct);
});

app.get("/products", async (req, res) => {
  res.json(await Product.find());
});

app.listen(3001, () => {
  console.log("App is listening on port 3001");
  connectDB(DB_URI);
});

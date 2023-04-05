const { default: mongoose, models, model } = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  picture: String,
});

const Product = models?.Product || model("Product", ProductSchema);

export default Product;

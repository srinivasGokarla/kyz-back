const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "electronics",
      "fashion",
      "groceries",
      "kids",
      "home",
      "sports",
      "books",
      "beauty",
      "tools",
      "outdoor",
    ],
    required: true,
  },
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const productModel = model("Product", productSchema);
module.exports = productModel;

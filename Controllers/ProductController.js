const productModel = require("../Model/Product");

const createProduct = async (req, res) => {
  try {
    const product = new productModel({ ...req.body, user: req.user.id });
    await product.save();
    return res
      .status(201)
      .send({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).send({ message: "Failed to create product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).send(products);
  } catch (error) {
    console.error("Error getting products:", error);
    return res.status(500).send({ message: "Failed to get products" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findOneAndUpdate({ _id: id, user: req.user.id }, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res
      .status(200)
      .send({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).send({ message: "Failed to update product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findOneAndDelete({ _id: id, user: req.user.id });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    return res
      .status(200)
      .send({ message: "Product deleted successfully", product });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).send({ message: "Failed to delete product" });
  }
};

const createProductScheduled = (req, res) => {
  const { minutes, product } = req.body;

  setTimeout(async () => {
    try {
      const newProduct = new productModel({ ...product, user: req.user.id });
      await newProduct.save();
      console.log("Scheduled product created successfully", newProduct);
    } catch (error) {
      console.error("Error creating scheduled product:", error);
    }
  }, minutes * 60 * 1000);

  return res.status(200).send({ message: "Product will be added after the specified time" });
};


module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  createProductScheduled,
};


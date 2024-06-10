const express = require("express");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  createProductScheduled
} = require("../Controllers/ProductController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createProduct);
router.get("/", authMiddleware,  getAllProducts);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware,  deleteProduct);
router.post("/schedule", authMiddleware, createProductScheduled);

module.exports = router;

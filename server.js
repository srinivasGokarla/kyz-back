const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

require('dotenv').config();

const userRouter = require("./src/Routes/UserRouter");
const ProductRouter = require("./src/Routes/ProductRoute");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/product", ProductRouter);

const PORT = process.env.PORT || 5550;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server Started at port No http://localhost:${PORT}`);
});

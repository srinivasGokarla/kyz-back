const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./Config/db");
const userRouter = require("./Routes/UserRouter");
const ProductRouter = require("./Routes/ProductRoute");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/product", ProductRouter);
const PORT = process.env.PORT || 5550;
connectDB();
app.listen(PORT, () => {
  console.log(`Server Started at port No http://localhost:${PORT}`);
});

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../Model/UserModel");

const registerUser = async (req, res) => {
  const { username, email, phone, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User Already Exist Please Login" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).send({
      message: "User Created Success",
      data: {
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Failed to Register" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).send({
      message: "Login Successful",
      token,
      data: {
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Failed to Login" });
  }
};

module.exports = { registerUser, loginUser };

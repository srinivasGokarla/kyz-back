const jwt = require("jsonwebtoken");
const userModel = require("../Model/UserModel");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.userId).select("-password");
    next();
  } catch (err) {
    res.status(401).send({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;

const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

const signup = async (req, res) => {
  // Existing user
  // Hashed Password
  // User Creation
  // Token Generation

  try {
    const { username, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User Already Exist" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await userModel.create({
        email,
        username,
        password: hashedPassword,
      });
      const token = jwt.sign(
        { email: result.email, id: result._id },
        SECRET_KEY
      );
      res.status(201).json({ user: result, token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      const matchPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!matchPassword) {
        res.status(400).json({ message: "Password Not Match" });
      } else {
        const token = jwt.sign(
          { email: existingUser.email, id: existingUser._id },
          SECRET_KEY
        );
        res.status(201).json({ user: existingUser, token });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

module.exports = { signup, signin };

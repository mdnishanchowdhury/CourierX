const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const dotenv = require("dotenv");

dotenv.config();

// Registration
const registerUser = async (req, res) => {
  const { fullname, email, password, phoneNumber, age, country, address } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullname,
      email,
      phoneNumber,  // Storing phone number
      password: hashedPassword,
      age,
      country,
      address
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while registering the user", error });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("You have not registered");
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(500).json("Wrong password");
    }

    // Exclude password field from user data
    const { password, ...info } = user._doc;

    // Create JWT token
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SEC,
      { expiresIn: "10d" }
    );

    // Return user info and access token
    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during login", error });
  }
};

module.exports = { loginUser, registerUser };

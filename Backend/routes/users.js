const express = require("express");
const {
  createUser,
  getAllUsers,
  getLoggedInUser,
  updateUser,
  changePassword
} = require("../controllers/users");
const authenticateUser = require("../middlewares/authenticateUser");

const router = express.Router();

// Create a new user
router.post("/", createUser);  // POST /api/v1/users

// Get all users (Only admin can access)
router.get("/", getAllUsers);  // GET /api/v1/users

// Get logged-in user details (Just Me)
router.get("/me", authenticateUser, getLoggedInUser);  // GET /api/v1/users/me

// Update user details (Admin or the user themselves)
router.put("/:id", updateUser);  // PUT /api/v1/users/:id

// Change user password
router.put("/:id/change-password", authenticateUser, changePassword);  // PUT /api/v1/users/:id/change-password

module.exports = router;

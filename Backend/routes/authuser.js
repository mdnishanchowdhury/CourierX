const express = require("express");
const { registerUser, loginUser } = require("../controllers/authuser");
const router = express.Router();


//Registration
router.post("/registers", registerUser)

//login
router.post("/logins", loginUser)

module.exports = router;
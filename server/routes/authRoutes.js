const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { protect, managerOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", protect, managerOnly, registerUser); 
router.post("/login", loginUser);

module.exports = router;

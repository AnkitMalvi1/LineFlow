const express = require("express");
const analyticsController = require("../controllers/analyticsController");
const { protect, managerOnly } = require("../middleware/authMiddleware"); 

const router = express.Router();

// ✅ Use correct function reference
router.get("/overview", protect, managerOnly, analyticsController.getAnalytics);

module.exports = router;

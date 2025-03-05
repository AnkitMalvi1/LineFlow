const express = require("express");
const { getWorkstations, createWorkstation, updateWorkstation } = require("../controllers/workstationController");
const { protect, managerOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getWorkstations); // ✅ Get all workstations
router.post("/", protect, managerOnly, createWorkstation); // ✅ Only managers can add workstations
router.put("/:id", protect, managerOnly, updateWorkstation); // ✅ Only managers can update workstations

module.exports = router;

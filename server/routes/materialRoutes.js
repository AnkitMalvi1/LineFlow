const express = require("express");
const { getMaterials, createMaterial, updateMaterialStock } = require("../controllers/materialController");
const { protect, managerOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getMaterials); // ✅ Fetch all materials
router.post("/", protect, managerOnly, createMaterial); // ✅ Only Managers can create materials
router.put("/:id", protect, managerOnly, updateMaterialStock); // ✅ Only Managers can update stock

module.exports = router;

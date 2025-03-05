const express = require("express");
const orderController = require("../controllers/orderController");
const { protect, managerOnly } = require("../middleware/authMiddleware"); // ✅ Ensure correct import

console.log("Order Controller Imports:", orderController);
console.log("Auth Middleware Imports:", { protect, managerOnly }); // ✅ Debug middleware import

const router = express.Router();

router.get("/", protect, orderController.getOrders);
router.post("/", protect, managerOnly, orderController.createOrder);
router.put("/:id/status", protect, orderController.updateOrderStatus);
router.delete("/:id", protect, managerOnly, orderController.deleteOrder);
router.put("/:id/workstation", protect, managerOnly, orderController.assignWorkstation);

module.exports = router;

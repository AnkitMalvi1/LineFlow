const ProductionOrder = require("../models/ProductionOrder");
const Material = require("../models/Material.js");
const { v4: uuidv4 } = require("uuid");

const getOrders = async (req, res) => {
    try {
        let query = {};
        if (req.query.status) query.status = req.query.status;
        if (req.query.workstation) query.workstationId = req.query.workstation;

        const orders = await ProductionOrder.find(query)
            .populate("workstationId")
            .populate("createdBy");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createOrder = async (req, res) => {
    try {
        const { productName, quantity, priority } = req.body;

        // ✅ Generate a unique orderId
        const orderId = `PROD-${uuidv4().split("-")[0].toUpperCase()}`;

        const order = await ProductionOrder.create({
            orderId, productName, quantity, priority, status: "Planned",
            createdBy: req.user.id
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const order = await ProductionOrder.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = req.body.status;

        if (order.status === "Completed") {
            for (let item of order.materialsUsed) {
                const material = await Material.findById(item.materialId);
                if (material) {
                    material.currentStock -= item.quantity;
                    await material.save();
                }
            }
        }

        await order.save();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await ProductionOrder.findByIdAndDelete(req.params.id);
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Assign workstation to order
const assignWorkstation = async (req, res) => {
    try {
        const { workstationId } = req.body;
        const order = await ProductionOrder.findById(req.params.id);

        if (!order) return res.status(404).json({ message: "Order not found" });

        const workstation = await Workstation.findById(workstationId);
        if (!workstation) return res.status(404).json({ message: "Workstation not found" });

        order.workstation = workstation._id;
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Ensure all functions are correctly exported
module.exports = { getOrders, createOrder, updateOrderStatus, deleteOrder, assignWorkstation };

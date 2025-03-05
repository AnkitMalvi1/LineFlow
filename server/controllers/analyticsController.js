const ProductionOrder = require("../models/ProductionOrder");
const Material = require("../models/Material");

const getAnalytics = async (req, res) => {
    try {
        const totalOrders = await ProductionOrder.countDocuments();
        const ordersByStatus = await ProductionOrder.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } },
        ]);

        const materialUsage = await Material.aggregate([
            { $project: { name: 1, currentStock: 1, minimumStockLevel: 1 } }
        ]);

        res.json({ totalOrders, ordersByStatus, materialUsage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Ensure correct function export
module.exports = { getAnalytics };

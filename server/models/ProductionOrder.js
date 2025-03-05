const mongoose = require("mongoose");

const ProductionOrderSchema = new mongoose.Schema({
    orderId: { type: String, unique: true, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    priority: { type: String, enum: ["High", "Medium", "Low"], required: true },
    status: { type: String, enum: ["Planned", "In Production", "Quality Check", "Completed"], default: "Planned" },
    materialsUsed: [{ materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material" }, quantity: Number }],
    workstationId: { type: mongoose.Schema.Types.ObjectId, ref: "Workstation" },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("ProductionOrder", ProductionOrderSchema);

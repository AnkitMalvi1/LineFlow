const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    currentStock: { type: Number, required: true },
    minimumStockLevel: { type: Number, required: true },
});

module.exports = mongoose.model("Material", MaterialSchema);

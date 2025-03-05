const mongoose = require("mongoose");

const WorkstationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});

module.exports = mongoose.model("Workstation", WorkstationSchema);

const Workstation = require("../models/Workstation");

// ✅ Get all workstations
exports.getWorkstations = async (req, res) => {
    try {
        const workstations = await Workstation.find();
        res.json(workstations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching workstations", error: error.message });
    }
};

// ✅ Create a new workstation
exports.createWorkstation = async (req, res) => {
    try {
        const { name, status } = req.body;
        const existing = await Workstation.findOne({ name });
        if (existing) return res.status(400).json({ message: "Workstation already exists" });

        const workstation = await Workstation.create({ name, status });
        res.status(201).json(workstation);
    } catch (error) {
        res.status(500).json({ message: "Error creating workstation", error: error.message });
    }
};

// ✅ Update workstation status
exports.updateWorkstation = async (req, res) => {
    try {
        const workstation = await Workstation.findById(req.params.id);
        if (!workstation) return res.status(404).json({ message: "Workstation not found" });

        workstation.status = req.body.status || workstation.status;
        await workstation.save();
        res.json(workstation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

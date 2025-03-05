const Material = require("../models/Material");

exports.getMaterials = async (req, res) => {
    try {
        const materials = await Material.find();
        res.json(materials);
    } catch (error) {
        res.status(500).json({ message: "Error fetching materials", error: error.message });
    }
};

exports.createMaterial = async (req, res) => {
    try {
        const { name, currentStock, minimumStockLevel } = req.body;

        // Check if material already exists
        const existingMaterial = await Material.findOne({ name });
        if (existingMaterial) {
            return res.status(400).json({ message: "Material already exists" });
        }

        const newMaterial = await Material.create({ name, currentStock, minimumStockLevel });
        res.status(201).json(newMaterial);
    } catch (error) {
        res.status(500).json({ message: "Error creating material", error: error.message });
    }
};


exports.updateMaterialStock = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        if (!material) return res.status(404).json({ message: "Material not found" });

        material.currentStock = req.body.currentStock;
        await material.save();

        res.json(material);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mongoose = require("mongoose");

const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        console.error("❌ JWT Error:", error);
        res.status(401).json({ message: "Invalid token" });
    }
};

const managerOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "Manager") {
        return res.status(403).json({ message: "Access Denied: Managers only" });
    }
    next();
};

// ✅ Ensure both functions are exported
module.exports = { protect, managerOnly };

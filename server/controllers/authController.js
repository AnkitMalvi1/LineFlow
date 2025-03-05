const User = require("../models/User");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
    try {

        const { username, email, password, role, department } = req.body;

        if (!role) {
            console.error("❌ Role is missing in request body");
            return res.status(400).json({ message: "Role is required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        // ✅ Only Managers can register Operators
        if (role === "Operator" && (!req.user || req.user.role !== "Manager")) {
            return res.status(403).json({ message: "Only Managers can register Operators" });
        }

        const user = await User.create({ username, email, password, role, department });
        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                department: user.department,
            },
        });
    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // ✅ Generate token with role
        const token = generateToken(user);

        res.json({
            token,
            user: { id: user._id, username: user.username, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

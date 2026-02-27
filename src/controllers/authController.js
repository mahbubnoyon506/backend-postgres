const { User } = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Helper function to generate JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });
};

exports.signUp = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await User.create({ email, password, role })
        res.status(201).json({ message: "User created successfully", token: generateToken(user.id, user.role) })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" })
        }
        res.json({ message: "Login successful", token: generateToken(user.id, user.role) })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
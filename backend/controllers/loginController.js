const User = require("../models/userSchema");

// Create a new user (register)
const registerUser = async (req, res) => {
    const newUser = new User(req.body);
    try {
        const createdUser = await newUser.save();
        res.status(200).json(createdUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Authenticate user (login)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json("Invalid credentials");
        }
        
        res.status(200).send("login succesfullyyyyy");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };
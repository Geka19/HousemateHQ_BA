const User = require("../models/userSchema");

// Create a new user
const createUser = async (req, res) => {
    const newUser = new User(req.body);
    try {
        const createdUser = await newUser.save();
        res.status(200).json(createdUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json("No users found");
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single user by ID
const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json("No user found");
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update user information
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: `Deleted user: ${req.params.userId}` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createUser, getAllUsers, getSingleUser, updateUser, deleteUser };
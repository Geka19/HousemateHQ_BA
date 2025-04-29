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
const getUserByEmail = async (req, res) => {
    try {
      const email = req.params.email;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  const getRandomUser = async (req, res) => {
    const currentUserEmail = req.params.email;
    try {
      const currentUser = await User.findOne({ email: currentUserEmail }).populate('friends');
  
      if (!currentUser) return res.status(404).json({ message: 'User not found' });
  
      const friendIds = currentUser.friends.map(f => f._id);
      const allExcluded = [...friendIds, currentUser._id];
  
      const randomUser = await User.aggregate([
        { $match: { _id: { $nin: allExcluded } } },
        { $sample: { size: 1 } }
      ]);
  
      if (randomUser.length === 0) {
        return res.status(200).json(null); // no more users to suggest
      }
  
      res.status(200).json(randomUser[0]);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const addFriend = async (req, res) => {
    const { userId, friendId } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      ).populate('friends');
  
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  const removeFriend = async (req, res) => {
    const { userId, friendId } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      ).populate('friends');
  
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  
  

module.exports = { createUser, getAllUsers, getSingleUser, updateUser, deleteUser, getUserByEmail, getRandomUser, addFriend, removeFriend };
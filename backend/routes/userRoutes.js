const express = require("express");
const router = express.Router();
const { createUser, getAllUsers, getSingleUser, updateUser, deleteUser, getUserByEmail, getRandomUser, addFriend, removeFriend } = require("../controllers/userController");
const upload = require('../middleware/upload');
const User = require('../models/userSchema');


// Routes
router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getSingleUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.get('/random/:email', getRandomUser);
router.post('/add-friend', addFriend);
router.post('/remove-friend', removeFriend);

router.put('/:userId/images', upload.array('images', 3), async (req, res) => {
    try {
      const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $set: { images: imagePaths } },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      console.error('Image upload error:', err); // Add this line if it's not there
      res.status(500).json({ message: err.message });
    }
  });

router.get('/email/:email', getUserByEmail);

module.exports = router;
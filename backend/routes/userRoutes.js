const express = require("express");
const router = express.Router();
const { createUser, getAllUsers, getSingleUser, updateUser, deleteUser } = require("../controllers/userController");

// Routes
router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getSingleUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
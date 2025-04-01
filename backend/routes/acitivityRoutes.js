const express = require("express");
const router = express.Router();
const { createActivity, getAllActivities, getSingleActivity, updateActivity, deleteActivity } = require("../controllers/activityController");

// Routes
router.post("/", createActivity);
router.get("/", getAllActivities);
router.get("/:activityId", getSingleActivity);
router.put("/:activityId", updateActivity);
router.delete("/:activityId", deleteActivity);

module.exports = router;
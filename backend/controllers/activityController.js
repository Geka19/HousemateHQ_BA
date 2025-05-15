// controllers/activityController.js
const Activity = require("../models/activitySchema");

// Create a new Activity
const createActivity = async (req, res) => {
  const newActivity = new Activity(req.body);
  try {
    const createdActivity = await newActivity.save();
    res.status(201).json(createdActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Activities
const getAllActivities = async (req, res) => {
    try {
      const activities = await Activity.find().sort({ date: 1 });
      res.status(200).json(activities); 
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Get a single Activity by ID
const getSingleActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.activityId);
    if (!activity) {
      return res.status(404).json("No activity found");
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an Activity
const updateActivity = async (req, res) => {
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.activityId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an Activity
const deleteActivity = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.activityId);
    res.status(200).json({ message: `Deleted activity: ${req.params.activityId}` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createActivity, getAllActivities, getSingleActivity, updateActivity, deleteActivity };

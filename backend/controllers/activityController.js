const Activity = require("../models/activitySchema");

// Create a new Activity
const createActivity = async (req, res) => {
    const newActivity = new Activity(req.body);
    try {
        const createdActivity = await newActivity.save();
        res.status(200).json(createdActivity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Activities
const getAllActivities = async (req, res) => {
    try {
        const Activities = await Activity.find();
        if (Activities.length === 0) {
            return res.status(404).json("No Activities found");
        }
        res.status(200).json(Activities);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single Activity by ID
const getSingleActivity = async (req, res) => {
    try {
        const Activity = await Activity.findOne({ _id: req.params.ActivityId });
        if (!Activity) {
            return res.status(404).json("No Activity found");
        }
        res.status(200).json(Activity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an Activity
const updateActivity = async (req, res) => {
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(
            req.params.ActivityId,
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
        await Activity.findByIdAndDelete(req.params.ActivityId);
        res.status(200).json({ message: `Deleted Activity: ${req.params.ActivityId}` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createActivity, getAllActivities, getSingleActivity, updateActivity, deleteActivity };
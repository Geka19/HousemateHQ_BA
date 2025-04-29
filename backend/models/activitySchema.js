// models/activitySchema.js
const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  place: { 
    type: String, 
    enum: ["Living Room", "Kitchen", "Outside", "Inside", "Others"], 
    required: true 
  },
  time: { type: String, required: true },
  date: { type: Date, required: true },
});

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;

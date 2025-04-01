const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    //ngl this will prolly change later into a normal string unless we elevate it somehow
    place: { type: String, enum: ["Living Room", "Kitchen", "Outside", "Inside", "Others"], required: true },
    time: { type: String, required: true },
    date: { type: Date, required: true }
});
//i just realized this doesn't have an id and maybe should for get one element??

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    course: { type: String },
    building: { type: String},
    room: { type: String},
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});
//we should have images here too but idk how to do that yet, let's do just information first 

const User = mongoose.model('User', userSchema);

module.exports = User;
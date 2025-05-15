const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    course: { type: String },
    building: { type: String},
    room: { type: String},
    bio: { type: String },
    images: [String],
    status: { type: String, default: "Active" },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}); 

const User = mongoose.model('User', userSchema);

module.exports = User;
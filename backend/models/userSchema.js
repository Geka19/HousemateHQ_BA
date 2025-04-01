const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //idk why there's two id's i fix later
    userId: { type: mongoose.Schema.Types.ObjectId, auto: true  },
    fullName: { type: String, required: true },
    course: { type: String, required: true },
    building: { type: String, required: true },
    room: { type: String, required: true },
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
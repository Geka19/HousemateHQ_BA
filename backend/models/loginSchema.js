const mongoose = require('mongoose');

// this schema for some reason doenst work, come back to this

const loginSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
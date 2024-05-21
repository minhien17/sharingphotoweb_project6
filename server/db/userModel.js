const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    location: { type: String},
    description: { type: String },
    occupation: { type: String },
});
module.exports = mongoose.model.users || mongoose.model('users', userSchema);
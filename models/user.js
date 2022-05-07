const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fb_id: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
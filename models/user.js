const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fb_id: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
    created_at: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
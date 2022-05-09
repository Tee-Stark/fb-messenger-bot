const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    birthday: {
        type: String,
        // required: true
    },
    messages: {
        start: Boolean,
        birthday: Boolean,
        birthday_added: Boolean,
        birthday_not_added: Boolean,
        goodbye: Boolean,
    },
    }, {
        timestamps: true
    }
);

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
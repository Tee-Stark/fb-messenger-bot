const User = require('../models/user');

const createUser = async (fb_id, first_name) => {
    try {
        const user = await User.create({
            fb_id,
            first_name,
        });
        return user;
    } catch (error) {
        throw error;
    }
}

const getUser = async (fb_id) => {
    try {
        const user = await User.findOne({ fb_id });
        return user;
    } catch (error) {
        throw error;
    }
}

const addBirthday = async (fb_id, birthday) => {
    try {
        const user = await User.findOneAndUpdate({ fb_id }, { birthday }, { new: true,});
        return user;
    } catch (error) {
        throw error;
    }
}

const getBirthday = async (fb_id) => {
    try {
        const user = await User.findOne({ fb_id });
        return user.birthday;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUser,
    addBirthday,
    getBirthday
}
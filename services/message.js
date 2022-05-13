const Message = require('../models/message');

const createNewMessage = (message) => {
    try {
        // check if user already exists
        const user = Message.findOne({ userId: message.userId });
        if(!user){
            // if user doesn't exist previously, create new user
            const newMessage = Message.create(message);
            return newMessage;
        } else {
            // else if user exists already, just add  the message's text to the user's messages
            if(typeof message === String) {
                const updatedMessage = Message.findOneAndUpdate(
                { userId: message.userId }, 
                { $push: { messages: message } }, 
                { new: true }
                );
                return updatedMessage;
            } else {
                throw new Error("Invalid message content");
            }
        }
    } catch (err) {
        throw err;
    }
}

/**
 * function to get all messages
 * @param { 'all' | 'summary' } mode - the mode to get all messages
 */
const getMessages = (mode) => {
    try {
        if(mode === "all") {
            // find all messages and return only the messages
            const messages = Message.find({}).select('messages -_id');
            return messages;
        } else if(mode === "summary") {
            // find all messages and return @userId, @userName, and @messages
            const messages = Message.find({}).select('-_id');
            return messages;
        } else {
            throw new Error("invalid mode")
        }
    } catch (err) {
        throw err;
    }
}

const getMessageById = (id) => {
    try {
        const message = Message.findById(id);
        return message;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createNewMessage,
    getMessages,
    getMessageById
}
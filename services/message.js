const logger = require('../config/logger');
const Message = require('../models/message');

const createNewMessage = async (message) => {
    try {
        // check if user already exists
        const user = await Message.findOne({ userId: message.userId });
        if(!user){
            // if user doesn't exist previously, create new user
            const newMessage = await Message.create(message);
            return newMessage;
        } else if(typeof message === String) {
            const updatedMessage = await Message.findOneAndUpdate(
            { userId: message.userId }, 
            { $push: { messages: message } }, 
            { new: true }
            );
            return updatedMessage;
        }
        else if(typeof message === Object) {
            const updatedMessage = await Message.findOneAndUpdate(
            { userId: message.userId },
            { $push: { messages: { $each: message.messages } } },
            { new: true }
            );
            return updatedMessage;
        } else {
            throw new Error("Invalid message content");
        }
    } catch (err) {
        logger.error(err)
        throw err;
    }
}

/**
 * function to get all messages
 * @param { 'all' | 'summary' } mode - the mode to get all messages
 */
const getMessages = async (mode) => {
    try {
        if(mode === "all") {
            // find all messages and return only the messages
            const messages = await Message.find().select('messages _id');
            // logger.info(messages);
            return messages;
        } else if(mode === "summary") {
            // find all messages and return @userId, @userName, and @messages
            const summary = await Message.find().select('-_id -__v');
            // logger.info(summary);
            return summary;
        } else {
            throw new Error("invalid mode")
        }
    } catch (err) {
        logger.error(err)
        throw err;
    }
}

const getMessageById = async (id) => {
    try {
        const message = await Message.findOne({_id: id});
        return message;
    } catch (err) {
        logger.error(err)
        throw err;
    }
}

module.exports = {
    createNewMessage,
    getMessages,
    getMessageById
}
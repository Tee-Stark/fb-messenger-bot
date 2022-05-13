const { getMessages, getMessageById } = require('../services/message')
const logger = require('../config/logger')


const getAllMessages = async (req, res) => {
    try {
        const messages = await getMessages("all");
        return res.status(200).json({
            status: 'success',
            data: messages
        });
    } catch (err) {
        logger.error(err)
        return res.status(500).json({
            status: 'error',
            error: err.message
        })
    }
}

const getSummary = async (req, res) => {
    try {
        const summary = getMessages("summary");
        return res.status(200).json({
            status: 'success',
            data: summary
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            error: err.message
        })
    }
}

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const message = getMessageById(id);
        if(!message) {
            return res.status(400).json({
                status: 'error',
                error: `Message ID ${id} is invalid!`
            });
        } else {
            return res.status(200).json({
                status: 'success',
                data: message
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            error: err.message
        })
    }
}

module.exports = {
    getAllMessages,
    getSummary,
    getById
}
const request = require('request')
const { PAGE_ACCESS_TOKEN } = require('../config/constants');
const logger = require('../config/logger');

const sendMessage = (receipientId, message) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://graph.facebook.com/v13.0/me/messages',
            qs: {
                access_token: PAGE_ACCESS_TOKEN
            },
            method: 'POST',
            json: {
                recipient: {
                    id: receipientId
                },
                message: message
            }
        }, (error, response, body) => {
            if (error) {
                logger.error(error)
                reject(response.error)
            } else if (response.body.error) {
                logger.error(response.body.error)
                reject(response.body.error)
            }
            resolve(body)
        });
    })
}

const typingAction = (receipientId) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://graph.facebook.com/v13.0/me/messages',
            qs: {
                access_token: PAGE_ACCESS_TOKEN
            },
            method: 'POST',
            json: {
                recipient: {
                    id: receipientId
                },
                sender_action: 'typing_on'
            }
        }, (error, response, body) => {
            if (error) {
                logger.error(error)
                reject(error)
            } else if (response.body.error) {
                logger.error(response.body.error)
                reject(error)
            }
            resolve(body)
        });
    })
}


module.exports = {
    sendMessage,
    typingAction
}
// const messageProcess = require('../processes/message.js');
const logger = require('../config/logger');
const { VERIFY_TOKEN } = require('../config/constants');

const webhook = async (req, res) => {
    try {
        let body = req.body;
        // Checks this is an event from a page subscription
        if (body.object === 'page') {
            body.entry.forEach(entry => {
                let webhook_event = entry.messaging[0];
                console.log(webhook_event);
                // if(webhook_event.message) {
                //     messageProcess(webhook_event);
                // }
            });
            return res.status(200).send('EVENT_RECEIVED');
        } else {
            return res.sendStatus(404);
        }
    } catch (err) {
        logger.error(err)
        res.status(500).json({
            error: err.message
        })
    }
}

const verifyWebhook = (req, res) => {
    try {
        const token = req.query['hub.verify_token'];
        const mode = req.query['hub.mode'];
        const challenge = req.query['hub.challenge']
        if(token && mode) {
            if(token === VERIFY_TOKEN && mode === 'subscribe') {
                logger.info('WEBHOOK_VERIFIED');
                res.status(200).send(challenge);
            } else {
                // return forbidden if verify tokens don't match
                res.sendStatus(403);
            }
        }
    } catch (err) {
        logger.error(err);
        res.status(500).json({
            error: err.message
        })
    }
}

module.exports = {
    webhook,
    verifyWebhook
}
const request = require('request');
const { sendMessage, typingAction } = require('../utils/sendMessage');
const { PAGE_ACCESS_TOKEN } = require('../config/constants');

const postbackProcess = async (_event) => {
    try {
        const sender_id = _event.sender.id;
        const payload = _event.postback.payload;
        switch (payload) {
            case `${'Hi' || 'Hello'}`:
                request({
                    url: `https://graph.facebook.com/v13.0/${sender_id}`,
                    qs: {
                        access_token: PAGE_ACCESS_TOKEN,
                        fields: 'first_name'
                    },
                    method: 'GET'
                }, async (error, response, body) => {
                    let welcomeMessage = '';
                    if (error) {
                        logger.error(error)
                        break;
                    } else if (response.body.error) {
                        logger.error(response.body.error)
                        break;
                    }
                    const user = JSON.parse(body);
                    welcomeMessage = `Hi ${user.first_name}!`;
                    let questionOne = {
                        text: 'What is your birthdate? (YYYY-MM-DD)',
                        quick_replies: [
                            {
                                content_type: 'text',
                                title: 'Today',
                                payload: 'Today'
                            }
                        ]
                    }
                    typingAction(sender_id);
                    await sendMessage(sender_id, { text:welcomeMessage });
                    await sendMessage(sender_id, questionOne);                   
                })
                break;
            default:
                typingAction(sender_id);
                await sendMessage(sender_id, { text:'Sorry, I don\'t understand.' });
                await sendMessage(sender_id, { text:'Please try again.' });
                break;
        }
    } catch (error) {
        logger.error(error);
    }
}

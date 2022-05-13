const request = require('request');
const logger = require("../config/logger");
const { isDate } = require("../utils/dateUtil");
const { sendMessage, typingAction } = require("../utils/sendMessage");
const { nextBirthday } = require("../utils/birthday");
const { PAGE_ACCESS_TOKEN } = require("../config/constants");
const { getUserState, setUserState } = require('../services/state');
const { createNewMessage } = require('../services/message');
const { botReplies, yesReplies, noReplies } = require('../utils/replies') 

let userBirthday = ''; // to hold user birthday value
let userId = '';

module.exports = messageProcess = async (sender_id, message) => {
    try {
            let text;
            // log message data in console
            logger.info(`Message received from ${sender_id}`);
            logger.info(message);
            /**Process message received */
            let userId = sender_id;
            let state = getUserState(userId);
            if(message.text) {
                text = message.text.toLowerCase();
                if(text === 'hi' || text === 'hey' || text === 'hello' && state === "start") {
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
                            await sendMessage(sender_id, botReplies.internalError);
                        } else if (response.body.error) {
                            logger.error(response.body.error)
                            await sendMessage(sender_id, botReplies.internalError);  
                        }
                        const user = JSON.parse(body);
                        logger.info(user)
                        userName = user.first_name;
                        // message object
                        const msg = {
                            userId,
                            userName,
                            messages: [text]
                        }
                        welcomeMessage = botReplies.start;
                        if(await createNewMessage(msg)) {
                            await typingAction(userId);
                            await sendMessage(userId, welcomeMessage);
                            await typingAction(userId)
                            await sendMessage(userId, botReplies.ask_birthday);
                            const updateState = await setUserState(userId, "birthday");
                            logger.info(updateState)
                        } else {
                            await typingAction(userId)
                            await sendMessage(userId, botReplies.internalError)
                        }            
                    })
                }
                else if(isDate(text) && state === "birthday") {
                    userBirthday = text;
                    if(await createNewMessage(userBirthday)) {
                        await typingAction(sender_id);
                        await sendMessage(sender_id, botReplies.days_to_birthday);
                        const updateState = await setUserState(userId, "days_to_birthday");
                        logger.info(updateState)
                    } else {
                        await typingAction(userId);
                        await sendMessage(userId, botReplies.internalError)
                    }
                }
                else if(yesReplies.includes(text) && state === "days_to_birthday") {
                    days = nextBirthday(days);
                    if(days !== -1) {
                        if(await createNewMessage(text)){
                            await typingAction(userId);
                            await sendMessage(userId, botReplies.days);
                            await sendMessage(userId, botReplies.balloon);
                            await typingAction(userId);
                            await sendMessage(userId, botReplies.goodbye)
                            const updateState = await setUserState(userId, "goodbye");
                            logger.info(updateState);
                        } else {
                            await typingAction(userId);
                            await sendMessage(userId, botReplies.internalError)
                        }
                    } else {
                        await typingAction(userId);
                        await sendMessage(userId, botReplies.invalidDate);
                    }
                }
                else if(noReplies.includes(text) && state === "days_to_birthday") {
                    if(await createNewMessage(text)){
                        await typingAction(userId);
                        await sendMessage(userId, botReplies.goodbye);
                        await sendMessage(userId, botReplies.balloon);
                        const updateState = await setUserState(userId, "goodbye")
                        logger.info(updateState)
                    } else {
                        await typingAction(userId)
                        await sendMessage(userId, botReplies.internalError)
                    }
                }
                else {
                    await typingAction(userId);
                    await sendMessage(userId, botReplies.invalidReply);
                }
            }                
            else if(message.quick_reply) {
                logger.info(`Quick reply received from ${userId}`);
                logger.info(message.quick_reply);
                text = message.quick_reply.text
                switch(message.quick_reply.payload) {
                    case 'today':
                        days = 0;
                        if(await createNewMessage(text)){
                            await typingAction(userId);
                            await sendMessage(userId, botReplies.days);
                            await sendMessage(userId, botReplies.goodbye)
                            const updateState = await setUserState(userId, "goodbye")
                            logger.info(updateState)
                            break;
                        } else {
                            await typingAction(userId);
                            await sendMessage(userId, botReplies.internalError)
                        }
                    case `yes`:
                        await typingAction(userId);
                        days = nextBirthday(birthday);
                        if(days !== -1) {
                            if(await createNewMessage(text)) {
                                await typingAction(userId);
                                await sendMessage(userId, botReplies.days);
                                await sendMessage(userId, botReplies.balloon)
                                await sendMessage(userId, botReplies.goodbye)
                                const updateState = setUserState(userId, "goodbye")
                                logger.info(updateState);
                                break;
                            } else {
                                await typingAction(userId);
                                await sendMessage(userId, botReplies.internalError)
                            }
                        } else {
                            typingAction(sender_id);
                            await sendMessage(userId, botReplies.invalidDate);
                            break;
                        }
                    case `no`:
                        if(await createNewMessage(text)) {
                            typingAction(userId);
                            await sendMessage(userId, botReplies.goodbye);
                            await sendMessage(userId, botReplies.balloon);
                            const updateState = await setUserState(userId, "goodbye");
                            logger.info(updateState)
                            break;
                        } else {
                            await typingAction(userId);
                            await sendMessage(userId, botReplies.internalError)
                        }
                    default:
                        await typingAction(sender_id);
                        await sendMessage(sender_id, botReplies.invalidReply);
                        break;
                }
            }
    } catch(error) {
        logger.error(error);
    }
}

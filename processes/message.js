const request = require('request');
const logger = require("../config/logger");
const { isDate } = require("../utils/dateUtil");
const { sendMessage, typingAction } = require("../utils/sendMessage");
const { nextBirthday } = require("../utils/birthday");
const { createUser, getUser, addBirthday, getBirthday } = require("../services/User");
const { PAGE_ACCESS_TOKEN } = require("../config/constants");
const { create } = require('../models/user');

let yesReplies = [
    'yes',
    'yes, please',
    'sure',
    'yeah',
    'yup',
    'ok',
    'okay',
];

let noReplies = [
    'no',
    'no, thanks',
    'nope',
    'nah',
    'naw',
    'no thanks',
    'no it\'s fine',
    'no, it\'s fine',
];

module.exports = messageProcess = async (sender_id, message) => {
    try {
            let text, days;
            logger.info(`Message received from ${sender_id}`);
            logger.info(message);
            if(message.text) {
                text = message.text.toLowerCase();
                if(text === 'hi' || text === 'hello') {
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
                            await sendMessage(sender_id, { text:'Sorry, I think something is wrong.😢 😢 😢' });
                        } else if (response.body.error) {
                            logger.error(response.body.error)
                            await sendMessage(sender_id, { text:'Sorry, I think something is wrong.😢 😢 😢' });  
                        }
                        const user = JSON.parse(body);
                        let userExists;
                        userExists = await getUser(sender_id);
                        if(!userExists) {
                            let userSaved = await createUser(sender_id, user.first_name);
                            if(!userSaved) {
                                await sendMessage(sender_id, { text:'Sorry, I think something is wrong.😢 😢 😢' });
                            }
                            userExists = userSaved;
                        }
                        logger.info(userExists);
                        welcomeMessage = `Hi ${user.first_name}! I\'m your friendly neighborhood birthday bot🧁🎂 .\n
                                          I can help you find out how many days until your next birthday. Let\'s Go!.`;
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
                }
                else if(isDate(text)) {
                    birthday = message.text;
                    const birthdaySaved = await addBirthday(sender_id, birthday);
                    logger.info(birthdaySaved);
                    typingAction(sender_id);
                    await sendMessage(sender_id, { text:'Would you like to know how many days until your next birthday?' });
                }
                else if(yesReplies.includes(text)) {
                    typingAction(sender_id);
                    days = await getBirthday(sender_id);
                    days = nextBirthday(days);
                    if(days !== -1) {
                        typingAction(sender_id);
                        await sendMessage(sender_id, { text: days === 0 ? 
                            `Today is your birthday! Happy birthday!🧁🎂 ` :
                            `There are ${days} days to your next birthday🧁🎂 ` 
                        });
                        await sendMessage(sender_id, { text: '🎈' });
                    } else {
                        typingAction(sender_id);
                        await sendMessage(sender_id, { text: `Sorry, I think you entered an invalid date, Try again!` });
                    }
                }
                else if(noReplies.includes(text)) {
                    typingAction(sender_id);
                    await sendMessage(sender_id, { text:'Goodbye 👋'});
                    await sendMessage(sender_id, { text: '🎈' })
                }
                else {
                    typingAction(sender_id);
                    await sendMessage(sender_id, { text:'Sorry, I don\'t understand.' });
                    await sendMessage(sender_id, { text:'Please try again.' });
                }
            }                
            else if(message.quick_reply) {
                logger.info(`Quick reply received from ${sender_id}`);
                logger.info(message.quick_reply);
                switch(message.quick_reply.payload) {
                    case 'Today':
                        typingAction(sender_id);
                        await sendMessage(sender_id, { text:'Today is your birthday!' });
                        await sendMessage(sender_id, { text:'Happy birthday!' });
                        await sendMessage(sender_id, { text: '🎈' });
                        break;
                    case `Yes`:
                        typingAction(sender_id);
                        days = nextBirthday(birthday);
                        if(days !== -1) {
                            typingAction(sender_id);
                            await sendMessage(sender_id, { text: days === 0 ? 
                                `Today is your birthday! Happy birthday!` :
                                `There are ${days} days to your next birthday` 
                            });
                            await sendMessage(sender_id, { text: '🎈' })
                            break;
                        } else {
                            typingAction(sender_id);
                            await sendMessage(sender_id, { text: `Sorry, I think you entered an invalid date, Try again!` });
                            break;
                        }
                    case `No`:
                        typingAction(sender_id);
                        await sendMessage(sender_id, { text: 'Goodbye 👋'});
                        await sendMessage(sender_id, { text: '🎈' })
                        break;
                    default:
                        typingAction(sender_id);
                        await sendMessage(sender_id, { text:'Sorry, I don\'t understand.' });
                        await sendMessage(sender_id, { text:'Please try again.' });
                        break;
                }
            }
    } catch(error) {
        logger.error(error);
    }
}

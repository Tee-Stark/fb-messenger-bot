const logger = require("../config/logger");
const { isDate } = require("../utils/dateUtil");
const { sendMessage, typingAction } = require("../utils/sendMessage");
const { nextBirthday } = require("../utils/birthday");

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

module.exports = messageProcess = async (_event) => {
    try {
        if(!_event.message.is_echo) {
            let birthday, days;
            const sender_id = _event.sender.id;
            const message = _event.message;
            logger.info(`Message received from ${sender_id}`);
            logger.info(message);
            if(message.text && isDate(message.text)) {
                birthday = message.text;
                typingAction(sender_id);
                await sendMessage(sender_id, { text:'Would you like to know how many days until your next birthday?' });
            }  
            if(message.text) {  
                if(yesReplies.includes(message.text.toLowerCase())) {
                    typingAction(sender_id);
                    days = nextBirthday(birthday);
                    if(days !== -1) {
                        typingAction(sender_id);
                        await sendMessage(sender_id, { text: days === 0 ? 
                            `Today is your birthday! Happy birthday!` :
                            `There are ${days} days to your next birthday` 
                        });
                    } else {
                        typingAction(sender_id);
                        await sendMessage(sender_id, { text: `Sorry, I think you entered an invalid date, Try again!` });
                    }
                }
                else if(noReplies.includes(message.text.toLowerCase())) {
                    typingAction(sender_id);
                    await sendMessage(sender_id, { text:'Goodbye 👋'});
                }
                else {
                    typingAction(sender_id);
                    await sendMessage(sender_id, { text:'Sorry, I don\'t understand.' });
                    await sendMessage(sender_id, { text:'Please try again.' });
                }
            }                
            if(message.quick_reply) {
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
                            break;
                        } else {
                            typingAction(sender_id);
                            await sendMessage(sender_id, { text: `Sorry, I think you entered an invalid date, Try again!` });
                            break;
                        }
                    case `No`:
                        typingAction(sender_id);
                        await sendMessage(sender_id, { text: 'Goodbye 👋'});
                        break;
                    default:
                        typingAction(sender_id);
                        await sendMessage(sender_id, { text:'Sorry, I don\'t understand.' });
                        await sendMessage(sender_id, { text:'Please try again.' });
                        break;
                }
            }

        }
    } catch(error) {
        logger.error(error);
    }
}

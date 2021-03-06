global.userName = ''
global.days = 0;

const botReplies = {
    "start": {
        "text": `Hi ${userName}! I\'m your friendly neighborhood birthday botπ§π .
                I can help you find out how many days until your next birthday. Let\'s Go!.`,
    },
    "ask_birthday": {
        "text": "What is your birthdate? (YYYY-MM-DD):",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "It's Today!π",
                "payload": "today"
            }
        ],
    },
    "days_to_birthday": {
        "text": "Would you like to know how many days until your next birthday?",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Yes",   
                "payload": "yes"
            },
            {
                "content_type": "text",
                "title": "Yup",   
                "payload": "yes"
            },
            {
                "content_type": "text",
                "title": "No",   
                "payload": "no"
            },
            {
                "content_type": "text",
                "title": "Nah",   
                "payload": "no"
            }
        ]
    },
    // not a state on it's own, but a reply -- part of the goodbye state
    "days": {
        text: days === 0 ? 
        `Today is your birthday! Happy birthday!π§π ` :
        `There are ${days} days to your next birthdayπ§π `
    },
    "goodbye": {
        text: "Goodbye π"
    },
    // for balloon celebrtion
    "balloon": {
        text: 'π'
    },
    // for errors
    "internalError": {
        text: "Sorry, I think something is wrong.π’ π’ π’"
    },
    "invalidReply": {
        text: "Sorry, I don\'t understand. Please try again"
    },
    "invalidDate": {
        text: "Sorry, I think you entered an invalid date, Try again!"
    }
}

const yesReplies = [
    'yes',
    'yes, please',
    'sure',
    'yeah',
    'yup',
    'ok',
    'okay',
];

const noReplies = [
    'no',
    'no, thanks',
    'nope',
    'nah',
    'naw',
    'no thanks',
    'no it\'s fine',
    'no, it\'s fine',
];

module.exports = {
    botReplies,
    yesReplies,
    noReplies
}
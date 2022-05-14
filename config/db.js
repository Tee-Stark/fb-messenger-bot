const mongoose = require('mongoose');
const logger = require('./logger');
const { DB_URL } = require('./constants');

module.exports = async () => {
    try {
        mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('Connected to mongoDB successfully 🙂');  
    } catch (error) {
        logger.error('Error connecting to mongoDB 😢');
        logger.error(error); 
        process.exit(1);
    }
}
const app = require('./app');
const logger = require('./config/logger');
const connectDB = require('./config/db');

const { PORT } = require('./config/constants');

const server = app.listen(PORT, async () => {
    await connectDB();
    logger.info(`
        $$$$$$##########$$$$$$$$$$########
        Server is running on port ${PORT}
        ######$$$$$$$$$$$#########$$$$$$$$$
        Server running on ${process.env.NODE_ENV} mode
    `);
});

module.exports = server;
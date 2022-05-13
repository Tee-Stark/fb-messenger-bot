const app = require('./app');
const logger = require('./config/logger');
const connectDB = require('./config/db');

const { PORT } = require('./config/constants');
const { ConnectRedis } = require('./config/redisConnect');

const server = app.listen(PORT, async () => {
    try {
        await ConnectRedis();
        await connectDB();
        logger.info(`
            $$$$$$##########$$$$$$$$$$########
            Server is running on port ${PORT}
            ######$$$$$$$$$$$#########$$$$$$$$$
            Server running on ${process.env.NODE_ENV} mode
        `);
    } catch (err) {
        logger.error(err)
    }
});

module.exports = server;
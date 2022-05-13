const Redis = require('redis');
const { REDIS_URL } = require('./constants');
const logger = require('./logger');

const redisCl = Redis.createClient(REDIS_URL);

exports.ConnectRedis = async () => {
  try {
    await redisCl.connect();
    redisCl.on('error', (err) => {
      logger.error(`Redis just suffered an error: ${err}`);
    });

    // redis connection event doesn't work correctly, so I decide to set a key and get it to confirm it works
    await redisCl.set('my test key', 'TEST: Redis is working 😆 😆 !!');
    const reply = await redisCl.get('my test key');
    logger.info(reply);
  } catch (err) {
    throw new Error(err);
  }
};

exports.RedisClient = redisCl;
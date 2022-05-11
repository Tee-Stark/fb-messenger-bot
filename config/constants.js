require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL, // 'mongodb://localhost/fb-messenger',
    VERIFY_TOKEN: process.env.VERIFY_TOKEN,
    PAGE_ACCESS_TOKEN: process.env.PAGE_ACCESS_TOKEN,
    REDIS_URL: process.env.REDIS_URL
}
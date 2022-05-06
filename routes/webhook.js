const { verifyWebhook } = require('../controllers/webhook')

module.exports = async (app) => {
    // Creates the endpoint for our webhook 
    app.post('/webhook', verifyWebhook);
}
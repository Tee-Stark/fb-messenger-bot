const { verifyWebhook, webhook } = require('../controllers/webhook')

module.exports = async (app) => {
    // Creates the endpoint for our webhook 
    app.get('/webhook', verifyWebhook);
    // verify webhook
    // app.post('/webhook', webhook);
}
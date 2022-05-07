const { verifyWebhook, webhook } = require('../controllers/webhook')

module.exports = async (app) => {
    // verify webhook 
    app.get('/webhook', verifyWebhook);
    // process requests against webhook
    app.post('/webhook', webhook);
}
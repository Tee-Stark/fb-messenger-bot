const { getSummary, getById, getAllMessages } = require('../controllers/message');

const router = require('express').Router()

router.get('/messages', getAllMessages);
router.get('/messages/:id', getById);
router.get('/summary', getSummary);

module.exports = router;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { NODE_ENV } = require('./config/constants');
const morgan = require('morgan');
const messageRoutes = require('./routes/message')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/webhook')(app);

app.use('/api/', messageRoutes);

if(NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

module.exports = app;
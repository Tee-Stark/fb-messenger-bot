const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { NODE_ENV } = require('./config/constants');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/webhook')(app);

if(NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

module.exports = app;
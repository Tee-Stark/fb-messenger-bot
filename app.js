const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { NODE_ENV } = require('./config/constants');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// require('./routes/webhook')(app);

if(NODE_ENV === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

module.exports = app;
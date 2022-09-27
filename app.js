const express = require('express');
const morgan = require('morgan');
const router = require('./router');

const app = express();

// Middleware
app.use(morgan('tiny')); // For console logs
app.use(express.json()); // For only parsing json content
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', router);

module.exports = app;
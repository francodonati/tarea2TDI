
const express = require('express');

const router = express.Router();
const airportRouter = require('./routers/airportRouter');
const flightRouter = require('./routers/flightRouter');
const appRouter = require('./routers/appRouter');

// Routes
router.use('/airports', airportRouter);
router.use('/flights', flightRouter);
router.use('/', appRouter);

module.exports = router;
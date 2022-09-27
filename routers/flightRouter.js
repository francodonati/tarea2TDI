const express = require('express');

const router = express.Router();
const { createFlight, getAllFlights, getFlight, deleteFlight, updateFlight } = require('../controllers/flightController');

router.post('/', createFlight);
router.get('/', getAllFlights);
router.get('/:id', getFlight);
router.delete('/:id', deleteFlight);
router.patch('/:id', updateFlight);

module.exports = router;
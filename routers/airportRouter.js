
const express = require('express');

const router = express.Router();
const { getAllAirports, createAirport, getAirport, updateAirport, deleteAirport } = require('../controllers/airportController');

router.get('/', getAllAirports);
router.get('/:id', getAirport);
router.post('/', createAirport);
router.patch('/:id', updateAirport);
router.delete('/:id', deleteAirport);

module.exports = router;
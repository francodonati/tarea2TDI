const { Airport, Flight } = require('../models');
const flight = require('../models/flight');

const deleteAll = async (req, res) => {
    try {
    //   const flights = await Flight.findAll();
    //   flights.forEach(flight => {
    //     await flight.destroy();
    //   });
    //   const airports = await Airport.findAll();
    //   airports.forEach(airport => {
    //     await airport.destroy();
    //   });
    await Flight.destroy({
        where: {},
        truncate: true
      });
    await Airport.destroy({
        where: {},
        truncate: true
      });
      res.status(200).json();
    } catch (error) {
      res.status(400).json({ error: 'Something went wrong! :(' });
    }
  };

  const getStatus = async (req, res) => {
    try {
      res.status(204).json();
    } catch (error) {
      res.status(400).json({ error: 'Something went wrong! :(' });
    }
  };


  module.exports = {
    getStatus,
    deleteAll,
  };
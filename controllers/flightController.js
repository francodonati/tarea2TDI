const axios = require('axios');
const { Airport, Flight } = require('../models');
const { AirportSerializer } = require('../serializers/airportSerializer');
const { FlightSerializer, FlightsSerializer } = require('../serializers/flightSerializer');

const getAllFlights = async (req, res) => {
    try {
      const flights = await Flight.findAll();
      res.status(200).json(FlightsSerializer(flights));
    } catch (error) {
      res.status(400).json({ error: 'Something went wrong! :(' });
    }
  };

const createFlight = async (req, res) => {
    try {
      let {
        id, departure, destination } = req.body;

      const departureAirport = departure
      const destinationAirport = destination
  
      const departureAirportExist = await Airport.findByPk(departureAirport);
      const destinationAirportExist = await Airport.findByPk(destinationAirport);

      const flightExist = await Flight.findByPk(id);
  
      if (!departureAirportExist || !destinationAirportExist) {
        res.status(404).json({ error: 'aeropuertos del body no existe' });
      }
  
      else if (destination == departure) {
        res.status(400).json({ error: 'aeropuertos deben ser diferentes' });
      }
  
      else if ( !id || !departure || !destination) {
        res.status(400).json({ error: 'faltan parametros en el body' });
      }

      else if ( flightExist ) {
        res.status(409).json({ error: 'flight ya existe' });
      }
  
      else {
        const latInicial =  departureAirportExist.position.lat;
        const longInicial =  departureAirportExist.position.long;
        const latFinal =  destinationAirportExist.position.lat;
        const longFinal =  destinationAirportExist.position.long;
        const response = await axios.get('https://tarea-2.2022-2.tallerdeintegracion.cl/distance?initial='+latInicial+','+longInicial+'&final='+latFinal+','+longFinal);
        const total_distance = response.data.distance;
        const traveled_distance = 0;
        const bearing = 0;
        const initialPosition = {"lat": latInicial, "long": longFinal};
        const position = initialPosition;
        departure = {"id": departureAirportExist.id, "name": departureAirportExist.name}
        destination = {"id": destinationAirportExist.id, "name": destinationAirportExist.name}
        const flight = await Flight.create({
          id,
          departure,
          destination,
          total_distance,
          traveled_distance,
          bearing,
          position
        });
        return res.status(201).json(FlightSerializer(flight));
      }
    } catch (error) {
      res.status(400).json({ error: 'Something went wrong wn! :(' });
    }
  };

  const getFlight = async (req, res) => {
    try {
      const { id } = req.params;
      const flight = await Flight.findByPk(id);
      if (!flight) {
        res.status(404).json({ error: 'este vuelo no existe' });
      }
  
      if (flight) {
        res.status(200).json(FlightSerializer(flight));
      }
    } catch (error) {
      res.status(400).json({ error: 'Something went wrong! :(' });
    }
  };

  const deleteFlight = async (req, res) => {
    try {
      const { id } = req.params;
      const flight = await Flight.findByPk(id);
      if (!flight) {
        res.status(404).json({ error: 'este vuelo no existe' });
      }
      else {
        await flight.destroy();
        res.status(204).json();
      }
    } catch (error) {
      res.status(400).json({ error: 'Something went wrong! :(' });
    }
  };

  const updateFlight = async (req, res) => {
    try {
      const { id } = req.params;
      const { lat, long } = req.body;
      const flight = await Flight.findByPk(id);
  
      if (!flight) {
        res.status(404).json({ error: 'este vuelo no existe' });
      }
  
      else if (!lat || !long || lat < -90 || lat > 90 || long < -180 || long > 180) {
        res.status(400).json({ error: 'body invalido' });
      }
  
      else {
        const position = {lat, long};
        const departureAirport = flight.departure.id;
        const airport = await Airport.findByPk(departureAirport);
        const response = await axios.get('https://tarea-2.2022-2.tallerdeintegracion.cl/distance?initial='+airport.position.lat+','+airport.position.long+'&final='+lat+','+long);
        const traveled_distance = response.data.distance;
        const bearing = response.data.bearing;
        await flight.update({traveled_distance, bearing, position});
        res.status(200).json(FlightSerializer(flight));
      }
    } catch (error) {
      res.status(400).json({ error: 'Something went wrong! :(' });
    }
  };


  module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    deleteFlight,
    updateFlight,
  };
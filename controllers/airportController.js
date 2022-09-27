const { Airport, Flight } = require('../models');
const { AirportsSerializer, AirportSerializer, UpdateAirportSerializer } = require('../serializers/airportSerializer');

const getAllAirports = async (req, res) => {
  try {
    const airports = await Airport.findAll();
    res.status(200).json(AirportsSerializer(airports));
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong! :(' });
  }
};


const getAirport = async (req, res) => {
  try {
    const { id } = req.params;
    const airport = await Airport.findByPk(id);
    if (!airport) {
      res.status(404).json({ error: 'este aeropuerto no existe' });
    }

    if (airport) {
      res.status(200).json(AirportSerializer(airport));
    }
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong! :(' });
  }
};

const deleteAirport = async (req, res) => {
  //FALTA CASO DE VUELO EN CURSO
  try {
    const { id } = req.params;
    const airport = await Airport.findByPk(id);
    let flightsCount = 0;
    const flightCounts = await Flight.findAll();
    if (flightCounts) {
      flightCounts.forEach(flightCounter => {
        if (flightCounter.destination.id == id) {
          flightsCount = flightsCount + 1;
        }
        if (flightCounter.departure.id == id) {
          flightsCount = flightsCount + 1;
        }
      });
    } 
    if (!airport) {
      res.status(404).json({ error: 'este aeropuerto no existe' });
    }
    else if (flightsCount > 0) {
      res.status(409).json({ error: 'aeropuerto tiene vuelo en progreso' });
    }
    else {
      await airport.destroy();
      res.status(204).json();
    }
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong! :(' });
  }
};

const updateAirport = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const airport = await Airport.findByPk(id);
    console.log(typeof(name));

    if (!airport) {
      res.status(404).json({ error: 'este aeropuerto no existe' });
    }

    else if (!name || typeof(name) != "string") {
      res.status(400).json({ error: 'body invalido' });
    }

    else if (airport && name) {
      await airport.update({name});
      res.status(204).json();
    }
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong! :(' });
  }
};



const createAirport = async (req, res) => {
  try {
    const {
      id, name, country, city, position
    } = req.body;

    const lat = position.lat;
    const long = position.long;

    const airportExist = await Airport.findByPk(id);
    if (id.length < 3) {
      res.status(400).json({ error: 'id debe tener más de 3 caracteres' });
    }

    else if (airportExist) {
      res.status(409).json({ error: 'ya existe este aeropuerto' });
    }

    else if (lat < -90 || lat > 90 || long < -180 || long > 180) {
      res.status(400).json({ error: 'parametros invalidos de lat y long' });
    }

    else if ( !id || !name || !country || !city) {
      res.status(400).json({ error: 'faltan parametros en el body' });
    }

    else {
      const airport = await Airport.create({
        id,
        name,
        country,
        city,
        position,
      });
      return res.status(201).json(AirportSerializer(airport));
    }
  } catch (error) {
    res.status(400).json({ error: 'Something went wrong! :(' });
  }
};
module.exports = {
  getAllAirports,
  getAirport,
  createAirport,
  updateAirport,
  deleteAirport,
};
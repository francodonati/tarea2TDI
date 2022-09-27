const UniqueAirportSerializer = (airport) => {
    const serializedUniqueAirport = {};
    ['id', 'name'].forEach((prop) => {
      serializedUniqueAirport[prop] = airport[prop];
    });
    return serializedUniqueAirport;
  };

const UpdateAirportSerializer = (airport) => {
    const serializedUpdateAirport = {};
    ['name'].forEach((prop) => {
      serializedUpdateAirport[prop] = airport[prop];
    });
    return serializedUpdateAirport;
  };

const AirportSerializer = (airport) => {
    const serializedAirport = {};
    ['id', 'name', 'country', 'city', 'position'].forEach((prop) => {
      serializedAirport[prop] = airport[prop];
    });
    return serializedAirport;
  };

const AirportsSerializer = (airports) => {
    const airportsList = [];
    airports.forEach((airport) => {
      const serializedAirport = UniqueAirportSerializer(airport);
      airportsList.push(serializedAirport);
    });
    return airportsList;
  };


  module.exports = {
    AirportsSerializer,
    AirportSerializer,
    UpdateAirportSerializer,
  };
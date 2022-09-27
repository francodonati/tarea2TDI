const FlightSerializer = (flight) => {
    const serializedFlight = {};
    ['id', 'departure', 'destination', 'total_distance', 'traveled_distance', 'bearing', 'position'].forEach((prop) => {
      serializedFlight[prop] = flight[prop];
    });
    return serializedFlight;
  };

  const UniqueFlightSerializer = (flight) => {
    const serializedUniqueFlight = {};
    serializedUniqueFlight['id'] = flight['id'];
    ['departure','destination'].forEach((prop) => {
      serializedUniqueFlight[prop] = flight[prop].id;
    });
    return serializedUniqueFlight;
  };


  const FlightsSerializer = (flights) => {
    const flightsList = [];
    flights.forEach((flight) => {
      const serializedFlight = UniqueFlightSerializer(flight);
      flightsList.push(serializedFlight);
    });
    return flightsList;
  };



  module.exports = {
    FlightSerializer,
    FlightsSerializer,
  };
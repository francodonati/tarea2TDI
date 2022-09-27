'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Flight.init({
    departure: DataTypes.JSON,
    destination: DataTypes.JSON,
    total_distance: DataTypes.FLOAT,
    traveled_distance: DataTypes.FLOAT,
    bearing: DataTypes.FLOAT,
    position: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};
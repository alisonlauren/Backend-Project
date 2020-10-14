'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Workout.hasOne(models.User)
    }
  };
  Workout.init({
    type:{
      allowNull: false,
      type: DataTypes.STRING
    },
    data: {
      allowNull: false,
      type: DataTypes.JSON,
    },
    start_time:{
      allowNull: false,
      type: DataTypes.TIME,
    },
    end_time:{
      allowNull: false,
      type: DataTypes.TIME,
    },
    cal:{
      allowNull: false,
      type: DataTypes.INTEGER
  }, 
    sequelize,
    modelName: 'Workout',
  });
  return Workout;
};
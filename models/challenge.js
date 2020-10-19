'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Challenge.belongsToMany(models.User, {through: 'UserChallenges'});
    }
  };
  Challenge.init({
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    criteria: {
      allowNull: false,
      type: DataTypes.JSONB
    },
    is_completed: {
      allowNull: false,
      defaultVale: false,
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'Challenge',
  });
  return Challenge;
};
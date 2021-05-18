const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const Character = sequelize.define('Character', {
  // Model attributes are defined here
  image: {
    type: DataTypes.STRING(250),
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  history: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  weigth: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
    
});

module.exports = Character;

Character.belongsToMany(require('./movies'), {
  through: "charactersMovies",
  as: "movies",
  foreignKey: "characterId"
});


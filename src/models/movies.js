const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const Movie = sequelize.define('Movie', {
  // Model attributes are defined here
  image: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(250),
    allowNull: false,
    unique: true
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  calification: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {

});

module.exports = Movie;

Movie.belongsToMany(require('./characters'), {
  through: "charactersMovies",
  as: "character",
  foreignKey: "movieId"
});

Movie.belongsTo(require('./contentTypes'), {
  foreignKey: 'contentTypeId',
  targetKey: 'id'
});

Movie.belongsTo(require('./genderTypes'), {
  foreignKey: 'genderTypeId',
  targetKey: 'id'
});



const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const Movie = sequelize.define('Movie', {
  // Model attributes are defined here
  image: {
    type: DataTypes.STRING(250),
    allowNull: true
  },
  title: {
    type: DataTypes.STRING(250),
    allowNull: false,
    unique: true
  },
  creationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  calification: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {

});

module.exports = Movie;

Movie.belongsToMany(require('./characters'), {
  through: "charactersMovies",
  as: "characters",
  foreignKey: "movieId"
});

Movie.belongsTo(require('./contentTypes'), {
  foreignKey: 'contentTypeId',
  targetKey: 'id',
  as: 'contentType'
});

Movie.belongsTo(require('./genderTypes'), {
  foreignKey: 'genderTypeId',
  targetKey: 'id',
  as: 'genderType'
});



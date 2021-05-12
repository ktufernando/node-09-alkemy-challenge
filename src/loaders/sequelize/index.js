const { Sequelize } = require('sequelize');
const config = require('../../config');

const sequelize = new Sequelize(
    config.database.name,
    config.database.username,
    config.database.password, {
    host: config.database.host,
    dialect: 'mysql'
});



module.exports = sequelize;
const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize');

const User = sequelize.define('Users', {
  // Model attributes are defined here
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  enable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  role: {
    type: DataTypes.ENUM({
      values: ['USER_ROLE', 'ADMIN_ROLE']
    }),
    defaultValue: 'USER_ROLE'
  }
}, {
    
});

module.exports = User;

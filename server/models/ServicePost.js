const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    description: {
    type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
      isAlphanumeric:true
      }
    },
    hourly_rate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    }
},{
    sequelize,
    // modelName: 'servicePost',
});

module.exports = Post;

const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('client', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    }
    ,
    celular: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nacimiento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },{timestamps:false});
};
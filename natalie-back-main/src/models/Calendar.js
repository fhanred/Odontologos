const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('calendar', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    procedimiento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    end: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    especialista:{
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },{timestamps:false});
};
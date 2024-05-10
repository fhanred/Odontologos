const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('financiero', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    monto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reason:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo: {
      type: DataTypes.ENUM("Bancolombia","TDC","Efectivo", "Daviplata","Nequi"),
      // allowNull: true,
    }
  },{timestamps:false});
};
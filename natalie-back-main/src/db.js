require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
//const {DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;



const sequelize = new Sequelize(
  "postgres://default:c9vzN8yUJrZb@ep-proud-hat-a4296ipl.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
 {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {}, //removed ssl
  });

  const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Client} = sequelize.models;

// const packChar = sequelize.define('pack_char', {
//   // Definición de otros campos de la tabla intermedia
// }, {
//   timestamps: false // Deshabilitar los campos de timestamp
// });

// Pack.belongsToMany(Char, { through: packChar})
// Char.belongsToMany(Pack, { through: packChar})

// User.hasMany(Item)

// Client.hasMany(Evolucion)
// Evolucion.belongsTo(Client)

// Client.hasMany(Compromiso)
// Compromiso.belongsTo(Client)

// Client.hasMany(Cotizacion)
// Cotizacion.belongsTo(Client)

  module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  };
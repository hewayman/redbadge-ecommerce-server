// import sequelize package
const Sequelize = require('sequelize');

// create a new instance of Sequelize, connecting us to a database
const database = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
  host: 'localhost',
  dialect: 'postgres'
});

// authenticate and log into the database
database.authenticate()
  .then(() => console.log('postgres db is connnected'))
  .catch(err => console.log(err))

module.exports = database;
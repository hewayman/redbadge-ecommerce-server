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

// this links the reviews to the users
User = database.import('./models/user');
Reviews = database.import('./models/review');

Reviews.belongsTo(User); // user id ends up on reviews table
User.hasMany(Reviews);

// this links the reviews to the listings
Listing = database.import('./models/listing');
// Reviews = database.import('./models/review');

Reviews.belongsTo(Listing); // has new column // userinfo
Listing.hasMany(Reviews); // user

module.exports = database;
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

// database
// .query('SHOW Tables', {
//   type: database.QueryTypes.SHOWTABLES
// })
// .then(result => console.log(result))

// this links the reviews to the users
User = database.import('./models/user');
Reviews = database.import('./models/review');
Listing = database.import('./models/listing');

// one to many relationship for users and reviews
User.hasMany(Reviews);
Reviews.belongsTo(User);

// one to many relationship for listings and reviews
Listing.hasMany(Reviews); 
Reviews.belongsTo(Listing);

module.exports = database;
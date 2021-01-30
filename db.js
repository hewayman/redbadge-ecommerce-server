// import sequelize package
const Sequelize = require('sequelize');

// create a new instance of Sequelize, connecting us to a database
const database = new Sequelize(
  process.env.DATABASE_URL || `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/ecommerce-store`, {
  dialect: 'postgres',
  options: {
    native: true,
    ssl: true
}
});

// authenticate and log into the database
database.authenticate()
  .then(() => database.sync())  
  // .then(() => database.sync({force: true}))  
  .then(() => console.log('postgres db is connected on ' + process.env.PORT))
  .catch(err => console.log(err))

// this links the reviews to the users & reviews to the store items
User = database.import('./models/user');
Review = database.import('./models/review');
Listing = database.import('./models/listing');

// one to many relationship for users and reviews
User.hasMany(Review, { as: 'userReview'});
Review.belongsTo(User);

// one to many relationship for listings and reviews
Listing.hasMany(Review, { as: 'itemReview' }); 
Review.belongsTo(Listing);

module.exports = database;
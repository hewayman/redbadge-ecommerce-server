require('dotenv').config();
const Express = require('express');
const app = Express();
const database = require('./db');

database.sync();

app.use(Express.json());

app.use(require('./middleware/headers'));


app.use(Express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('index'));

const usercontroller = require('./controllers/usercontroller');
app.use('/user', usercontroller);

const listingcontroller = require('./controllers/listingcontroller');
app.use('/listing', listingcontroller);

const reviewcontroller = require('./controllers/reviewcontroller');
app.use('/review', reviewcontroller);

app.listen(process.env.PORT, function() { console.log(`app is listening on port ${process.env.PORT}`)});

require('dotenv').config();
const Express = require('express');
const app = Express();
const database = require('./db');

// database.sync();

app.use(Express.json());

// app.use(require('./middleware/headers'));

app.listen(process.env.PORT, function() { console.log(`app is listening on port ${process.env.PORT}`)});

app.use(Express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render('index'));

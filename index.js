require('dotenv').config({path: __dirname + '/.env'});

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const path = require('path');

const api = require('./routes/api');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// session and flash setup
app.use(session({
  secret:'flashblog',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());


mongoose.connect(`mongodb://localhost:27017/arka`, {
  useNewUrlParser: true,
  useUnifiedTopology : true,
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/dist')));

app.use('/', api);

app.listen(process.env['PORT'], () => {
    console.log(`server is running on port ${process.env['PORT']}!`);
});
//Main
require('dotenv').config();

const update = require('./js/update');
const express = require('express');
const app = express();
const passport = require('passport');

//Secondary
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

//Modules
const login = require('./routes/login');
const register = require('./routes/register');
const setgithubusername = require('./routes/setgithubusername');
const getuser = require('./routes/getuser');
const addwidget = require('./routes/addwidget');
const authfacebook = require('./routes/auth/facebook');
const about = require('./routes/about');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//For Twitter
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());


const db = require('./config/mongokey').MongoURI;
mongoose.set('useCreateIndex', true);
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Mongoose connected !"))
    .catch(err => console.log);

//Enabling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, OPTIONS, PATCH, DELETE, GET');
    next();
});

const WeatherTemperatureChanged = require('./js/actions').WeatherTemperatureChanged;
const ReactionEnum = require('./js/reactions').ReactionEnum;
const ActionEnum = require('./js/actions').ActionEnum;

//Routes
app.use('/login', login);
app.use('/register', register);
app.use('/setgithubusername', setgithubusername);
app.use('/getuser', getuser);
app.use('/addwidget', addwidget);
app.use('/auth/facebook', authfacebook);
app.use('/about.json', about);

//Reload widgets
function launch_reloading() {
    update();
    return new Promise(resolve => setTimeout(() => launch_reloading(), 15000));
}

launch_reloading();

//Error Handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;

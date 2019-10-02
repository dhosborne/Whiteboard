const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./config/database');

mongoose.Promise = require('bluebird');
var options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    family: 4,
    promiseLibrary: require('bluebird'),
    user: config.username,
    pass: config.password,
};

mongoose.connect(config.URI, options)
.catch((error) => {console.error(error)});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connnected on ' + config.URI);
});

mongoose.connection.on('error', (error) => {
    console.log('Mongoose connection error' + error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection closed');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

var routes = (require('./routes'));
routes(app);

app.listen(port, config.host, () =>{});
console.log('Api server started on port ' + port);

module.exports = app;
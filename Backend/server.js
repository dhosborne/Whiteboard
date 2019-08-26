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
mongoose.connect(config.database, {
    promiseLibrary: require('bluebird'), 
    useNewUrlParser: true, 
    useCreateIndex: true
})
.then(() => { console.log('connection successful')})
.catch((err) => {console.error(err)});

app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

var routes = (require('./routes'));
routes(app);

app.listen(port);
console.log('Api server started on port ' + port);

module.exports = app;
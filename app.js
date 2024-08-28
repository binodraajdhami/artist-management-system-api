require('dotenv/config');
const express = require('express');
const app = express();
const configs = require('./configs');
const morgan = require('morgan');
const bodyParser = require('body-parser')

app.use(morgan('dev'));
var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// import api routes
const apiRoutes = require('./routes');
app.use('/api', jsonParser, apiRoutes);

app.listen(process.env.PORT || configs.app.port, function (err) {
    if (err) {
        console.log('Server listen failed!');
    } else {
        console.log(`Server listen at port : ${process.env.PORT || configs.app.port}`);
    }
});
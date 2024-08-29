require('dotenv/config');
const express = require('express');
const app = express();
const configs = require('./configs');
const morgan = require('morgan');
const bodyParser = require('body-parser')

// Use Third-Party Middlewares
app.use(morgan('dev'));

// Import API Routes
const apiRoutes = require('./routes');
app.use('/api', bodyParser.urlencoded({ extended: false }), apiRoutes);

// Not-Found Middleware
app.use(function (req, res, next) {
    res.status(404).json({
        msg: "Invalid Route!"
    })
});

// Error Handling Middleware
app.use(function (req, res, next, err) {
    res.json({
        status: err.status || 404,
        msg: err.msg || "Error Handling Middleware"
    })
})

app.listen(process.env.PORT || configs.app.port, function (err) {
    if (err) {
        console.log('Server listen failed!');
    } else {
        console.log(`Server listen at port : ${process.env.PORT || configs.app.port}`);
    }
});
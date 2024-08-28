const express = require('express');
const app = express();
const configs = require('./configs');




app.listen(configs.app.port, function (err) {
    if (err) {
        console.log('Server listen failed!');
    } else {
        console.log(`Server listen at port : ${configs.app.port}`);
    }
});
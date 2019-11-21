require('./mysql/mysqlConnector').init();

const express = require('express');
const app = express();

const indexServer = require('./server/indexServer');
app.use('/', indexServer);
app.listen(3000, function() {
    console.log('start server 3000 port');
});
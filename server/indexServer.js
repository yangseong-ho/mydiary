var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var mysqlDbc = require('../mysql/mysqlConnector');

app.set('views', 'views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.urlencoded());


router = require('../routes/index')(app)

module.exports = app;
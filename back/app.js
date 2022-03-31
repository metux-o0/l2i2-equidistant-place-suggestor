var express = require("express");
var path = require("path");
var app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../front/public")));

const recoie = require('./nearby');

app.use('/', recoie);

module.exports = app;

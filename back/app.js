var express = require("express");
var path = require("path");
var app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../front/public")));

var tab_pers;

app.post('/formulaire', (req, res) => {
  tab_pers = req.body;
  console.log(req.body);
});

app.get('/carte', (req, res) => {
  res.send(tab_pers);
  console.log(tab_pers);
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/public/index.html"));
});

module.exports = app;

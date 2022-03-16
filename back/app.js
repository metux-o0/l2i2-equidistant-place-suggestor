var express = require("express");
var path = require("path");
var app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../front/public")));

app.post("/formulaire", (req, res) => {
  const donnee = req.body;
  console.log(req.body);
});

app.get("/carte", (req, res) => {});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/public/index.html"));
});

module.exports = app;

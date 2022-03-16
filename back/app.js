var express = require("express");
var path = require("path");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../front/public")));

app.get("/", (req, res) => {
  console.log("Connecter au localhost:3000 !!");
});
app.get("/formulaire", (req, res) => {
  res.json(req.body);
});

app.get("/carte", (req, res) => {});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/public/index.html"));
});

module.exports = app;

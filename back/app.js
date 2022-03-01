var express = require('express');
var app = express();
const path = require('path');

app.get('/a', (req, res) => {
  console.log('Connecter au localhost:3000 !!');
});

app.get('/b', (req, res) => {
  console.log('Bouton !!');
});

module.exports = app;
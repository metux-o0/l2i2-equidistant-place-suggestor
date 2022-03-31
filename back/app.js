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


/*app.post('/formulaire', (req, res) => {
  const tab_pers = req.body.tab1;
  const dateChoisie = req.body.dateChoisie;
  console.log(req.body);
  //lieu choisi
  res.send('ok');
});

app.get('/carte', (req, res) => {
  res.send([
    {
      nom: 'Blandine',
      adresse: '12 residence de paris',
      latlng: { lat: 48.86639876369186, lng: 2.346441235774299 },
    },
    {
      nom: 'Université',
      adresse: '45 rue des Saints-Pères',
      latlng: { lat: 48.85522290905313, lng: 2.3319466418882806 },
    },
    {
      nom: 'Rafika',
      adresse: '45 rue des Saints-Pères',
      latlng: { lat: 48.95522290905313, lng: 2.3319466418882806 },
    },
    {
      nom: 'Boubakar',
      adresse: '45 rue des Saints-Pères',
      latlng: { lat: 48.8587413, lng: 2.38787 },
    },
    {
      nom: 'Personne 5',
      adresse: '45 rue des Saints-Pères',
      latlng: { lat: 48.85654165, lng: 2.374126 },
    },
    {
      nom: 'Personne 6',
      adresse: '45 rue des Saints-Pères',
      latlng: { lat: 48.8559841513, lng: 2.39856806 },
    },
    {
      nom: 'Restaurant',
      adresse: '45 rue des Saints-Pères',
      latlng: { lat: 48.855784653, lng: 2.339852 },
    },
  ]);
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/public/index.html"));
});*/

module.exports = app;

const router = require('express').Router();
const express = require('express');
const app = express();
const axios = require('axios');

router.post('/formulaire', async (req, res) => {
  var tab_pers = req.body.tab1;
  var dateChoisi = req.body.dateChoisie;
  console.log(req.body);
  const tab_lieu = [];

  try {
    await axios
      .get(
        'https://data.iledefrance.fr/api/records/1.0/search/?dataset=base-de-donnees-patrimoine-gourmand-idf&q=&lang=fr&rows=2000&facet=commune&facet=code_departement&facet=deno&facet=activite&facet=produit&facet=sources&facet=classement'
      )
      .then(function (response) {
        response.data.results.forEach((element) => {
          tab_lieu.push({
            nom: element.name,
            adresse: element.vicinity,
            latlng: element.geometry.location,
          });
        });
        function toRad(valeur) {
          return (valeur * Math.PI) / 180;
        }
        function calculdistance(rest, adr) {
          var x1 = rest.latlng.lat;
          var y1 = rest.latlng.lng;

          var x2 = adr.latlng.lat;
          var y2 = adr.latlng.lng;

          var R = 6371;
          var dLat = toRad(x2 - x1);
          var dLon = toRad(y2 - y1);

          var lat1 = toRad(x1);
          var lat2 = toRad(x2);

          var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) *
              Math.sin(dLon / 2) *
              Math.cos(lat1) *
              Math.cos(lat2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c;
          return d;
        }

        var distance_global = [];
        var distancetotal = 0;

        tab_lieu.forEach((j) => {
          tab_pers.forEach((i) => {
            distancetotal += calculdistance(j, i);
          }),
            distance_global.push({
              nom: j.nom,
              adresse: j.adresse,
              latlng: j.latlng,
              distance: distancetotal,
            });
          distancetotal = 0;
        });
        var restau_choisie = 100;
        distance_global.forEach((Element) => {
          if (Element.distance < restau_choisie) {
            restau_choisie = Element;
          }
        });

        tab_pers.push(restau_choisie);
        res.send(restau_choisie);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
});

router.get('/carte', (req, res) => {
  res.send({ pers: tab_pers, restaurant: resto, date: dateChoisi });
});

module.exports = router;

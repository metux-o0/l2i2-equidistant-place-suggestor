const router = require('express').Router();
const express = require('express');
const axios = require('axios');

router.post('/formulaire', async (req, res) => {
  var tab_pers = req.body.tab1;
  const tab_lieu = [];

  axios
    .get(
      'https://data.iledefrance.fr/api/records/1.0/search/?dataset=lile-de-france-fete-ses-restos&q=&lang=fr&rows=50&facet=type_d_etablissement'
    )
    .then(function (response) {
      response.data.records.forEach((element) => {
        tab_lieu.push({
          nom: element.fields.nom_de_l_etablissement,
          adresse: element.fields.adresse_de_l_etablissement,
          latlng: {
            lat: element.geometry.coordinates[1],
            lng: element.geometry.coordinates[0],
          },
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
          if (!isNaN(calculdistance(j, i))) {
            distancetotal += calculdistance(j, i);
          }
        }),
          distance_global.push({
            nom: j.nom,
            adresse: j.adresse,
            latlng: j.latlng,
            distance: distancetotal,
          });
        distancetotal = 0;
      });
      var restau_choisie = distance_global[0];
      distance_global.forEach((Element) => {
        if (Element.distance < restau_choisie.distance) {
          restau_choisie = Element;
        }
      });
      console.log(restau_choisie);
      tab_pers.push(restau_choisie);
      res.send(tab_pers);
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;

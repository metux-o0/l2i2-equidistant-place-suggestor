const router = require("express").Router();
//const equi = require('../controllers/equidistance');
const axios = require("axios");
const key = process.env.REACT_APP_GOOGGLE_API_KEY;

router.post("/formulaire", async (req, res) => {
  var tab_pers = req.body.tab1;
  const dateChoisie = req.body.dateChoisie;
  const tab_lieu = [];

  try {
    axios
      .get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
          48.8 +
          "%2C" +
          2.3 +
          "&radius=1000&keyword=restaurant&pagetoken=[NEXT PAGE TOKEN GOES HERE]&type=restaurant&key=key"
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
            distance_global.push([j.nom, distancetotal]),
            (distancetotal = 0);
        });
        var restau_choisie = 100;
        distance_global.forEach((Element) => {
          if (Element[1] < restau_choisie) {
            restau_choisie = Element[0];
          }
        });
        console.log(distance_global);
        console.log(restau_choisie);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

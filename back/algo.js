const router = require("express").Router();
const express = require("express");
const axios = require("axios");

router.post("/formulaire", async (req, res) => {
  var tab_pers = req.body.tab1;
  var dateChoisi = req.body.dateChoisie;
  var activite = req.body.activite;
  console.log(activite);
  const tab_lieu = [];

  if (activite === "restaurant") {
    url =
      "https://data.iledefrance.fr/api/records/1.0/search/?dataset=lile-de-france-fete-ses-restos&q=&lang=fr&rows=280&facet=type_d_etablissement";
  } else if (activite === "sport") {
    url =
      "https://data.iledefrance.fr/api/records/1.0/search/?dataset=iles_de_loisirs_idf&q=&rows=211&facet=ile_de_loisir&facet=departement&facet=titre";
  } else {
    url =
      "https://data.iledefrance.fr/api/records/1.0/search/?dataset=principaux-sites-touristiques-en-ile-de-france0&q=&rows=672";
  }
  axios
    .get(url)
    .then(function (response) {
      var distance_global = [];
      var distancetotal = 0;
      var distances = [];
      if (activite === "restaurant") {
        response.data.records.forEach((element) => {
          if (element.fields.nom_de_l_etablissement != "LAVINIA") {
            tab_lieu.push({
              nom: element.fields.nom_de_l_etablissement,
              adresse: element.fields.adresse_de_l_etablissement,
              latlng: {
                lat: element.geometry.coordinates[1],
                lng: element.geometry.coordinates[0],
              },
              specialite: element.fields.specialite_culinaire,
              ouverture: element.fields.horaires_d_ouverture_et_de_fermeture_de_l_etablissement,
            });
          }
        });
        tab_lieu.forEach((j) => {
          var equi = true;
          tab_pers.forEach((i) => {
            if (!isNaN(calculdistance(j, i))) {
              distancetotal += calculdistance(j, i);
              distances.push(calculdistance(j, i));
            }
          });
          distances.forEach((k) => {
            if (k - (k + 1) > 5) {
              equi = false;
            }
          });
          if (equi) {
            distance_global.push({
              nom: j.nom,
              adresse: j.adresse,
              latlng: j.latlng,
              specialite: j.specialite,
              ouverture: j.ouverture,
              distance: distancetotal,
            });
          }
          distances = [];
          distancetotal = 0;
        });
      } else if (activite === "sport") {
        response.data.records.forEach((element) => {
          tab_lieu.push({
            nom: element.fields.ile_de_loisir,
            adresse: element.fields.departement,
            latlng: {
              lat: element.geometry.coordinates[1],
              lng: element.geometry.coordinates[0],
            },
            specialite:element.fields.titre,
            ouverture: null,
          });
        });
        tab_lieu.forEach((j) => {
          var equi = true;
          tab_pers.forEach((i) => {
            if (!isNaN(calculdistance(j, i))) {
              distancetotal += calculdistance(j, i);
              distances.push(calculdistance(j, i));
            }
          });
          distances.forEach((k) => {
            if (k - (k + 1) > 5) {
              equi = false;
            }
          });
          if (equi) {
            distance_global.push({
              nom: j.nom,
              adresse: j.adresse,
              latlng: j.latlng,
              specialite: j.specialite,
              ouverture: j.ouverture,
              distance: distancetotal,
            });
          }
          distances = [];
          distancetotal = 0;
        });
      } else {
        response.data.records.forEach((element) => {
          tab_lieu.push({
            nom: element.fields.nom_carto,
            adresse: element.fields.adresse,
            latlng: {
              lat: element.geometry.coordinates[1],
              lng: element.geometry.coordinates[0],
            },
            specialite: element.fields.typo_niv3,
            ouverture: null,
          });
        });
        tab_lieu.forEach((j) => {
          var equi = true;
          tab_pers.forEach((i) => {
            if (!isNaN(calculdistance(j, i))) {
              distancetotal += calculdistance(j, i);
              distances.push(calculdistance(j, i));
            }
          });
          distances.forEach((k) => {
            if (k - (k + 1) > 5) {
              equi = false;
            }
          });
          if (equi) {
            distance_global.push({
              nom: j.nom,
              adresse: j.adresse,
              latlng: j.latlng,
              specialite: j.specialite,
              ouverture: j.ouverture,
              distance: distancetotal,
            });
          }
          distances = [];
          distancetotal = 0;
        });
      }
      
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
      
      var restau_choisie = distance_global[0];
      
      distance_global.forEach((Element) => {
        if (Element.distance < restau_choisie.distance) {
          restau_choisie = Element;
        }
      });

      
      axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=restaurant&inputtype=textquery&locationbias=point%40'+restau_choisie.latlng.lat+'%2C'+restau_choisie.latlng.lng+'&fields=opening_hours%2Cgeometry&key=KEY')
           .then(function (res) {
             if(res.data.candidates[0].opening_hours.open_now===true){
              restau_choisie.ouverture="Ouvert";
             }
             else{
              restau_choisie.ouverture="Fermée";
             }
             console.log(JSON.stringify(res.data.candidates[0].geometry.location));
             console.log(JSON.stringify(res.data.candidates[0].opening_hours.open_now));
      })
      
      console.log(restau_choisie);
      tab_pers.push(restau_choisie);
      res.send(tab_pers);
    })
    .catch(function (error) {
      console.log(error);
    });
  });
  
  module.exports = router;
  
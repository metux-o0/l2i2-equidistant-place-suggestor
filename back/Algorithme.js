const restau = [
  {
    nom: "Restaurant 1",
    adresse: "12 rue Dauphine Paris",
    latlng: { lat: 48.855784653, lng: 2.339852 },
  },
  {
    nom: "Restaurant 2",
    adresse: "48 boulveard de Paris",
    latlng: { lat: 48.8559841513, lng: 2.39856806 },
  },
];

const adresse = [
  {
    nom: "Blandine",
    adresse: "7 rue Léopold Paris 75012",
    latlng: { lat: 48.86639876369186, lng: 2.346441235774299 },
  },
  {
    nom: "Rafika",
    adresse: "45 rue de saint michel",
    latlng: { lat: 48.95522290905313, lng: 2.3319466418882806 },
  },
  {
    nom: "Boubakar",
    adresse: "12 boulevard saibt andre des arts",
    latlng: { lat: 48.8587413, lng: 2.38787 },
  },
];

function toRad(valeur) {
  return (valeur * Math.PI) / 180;
}

function calculdistance(rest, adr) {
  //calcule de la distance entre l'adresse d'un utilisateur et le restaurant
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
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

var distance_global = [];
var distancetotal = 0;

restau.forEach((j) => {
  adresse.forEach((i) => {
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

console.log(restau_choisie);

var axios = require("axios");

axios
  .get(
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=AIzaSyBLUExbctfSkizYyeJmkoidjB7RquqOsxo"
  )
  .then((res) => {
    console.log(res.data.candidates[0].opening_hours);
  });

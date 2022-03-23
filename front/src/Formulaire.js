import "./style/formulaire.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { google } from "google-maps-react";
var tab1 = [];

function Formulaire() {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [dispo, setDispo] = useState([
    {
      lundi: 0,
      mardi: 0,
      mercredi: 0,
      jeudi: 0,
      vendredi: 0,
      samedi: 0,
      dimanche: 0,
    },
  ]);
  const data = { nom: nom, adresse: adresse, dispo: dispo };

  useEffect(() => {
    axios
      .get("http://localhost:3000/formulaire", { ...data })
      .then((res) => console.log(res.data.message));
  }, []);
  axios
    .post("http://localhost:3000/formulaire", { ...data })
    .then((res) => console.log(res.data.message));

  var objLocation, objMaps, objCurrentLocationMarker, objInfoWindow, objService;
  function doSearch() {
    objService.nearbySearch(
      {
        location: objLocation,
        radius: 2000,
        types: ["restaurant"],
      },
      function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }
    );
  }
  function createMarker(objPlace) {
    if (objPlace.types[0] !== "restaurant") {
      return;
    }

    var objMarker = new google.maps.Marker({
      position: objPlace.geometry.location,
      map: objMaps,
      icon: "http://www.google.com/mapfiles/ms/micons/purple-dot.png",
      title: objPlace.name,
    });

    google.maps.event.addListener(objMarker, "click", function () {
      var strHTML = "<b>" + objPlace.name + "</b><br />";
      if (objPlace.types[0] == "restaurant") {
        strHTML += "Resto";
      } else {
        strHTML += "Inconnu (" + objPlace.types[0] + ")";
      }

      objInfoWindow.setContent(strHTML);
      objInfoWindow.open(objMaps, this);
    });
  }

  return (
    <div id="formulaire" /*onLoad={init}*/>
      <form action="/log" method="post">
        <label id="case">Nom :</label>
        <input
          type="text"
          id="name"
          onChange={(e) => {
            setNom(e.target.value);
          }}
        />
        <label id="case">Adresse :</label>
        <input
          type="text"
          id="adr"
          onChange={(e) => {
            setAdresse(e.target.value);
          }}
        />
        <br />
        <label id="case">Disponibilité :</label>
        <br />
        <input type="checkbox" id="case1" name="lundi" value="lundi" />
        <label for="lundi">Lundi</label>
        <br />
        <input type="checkbox" id="case2" name="mardi" value="mardi" />
        <label for="mardi">Mardi</label>
        <br />
        <input type="checkbox" id="case3" name="mercredi" value="mercredi" />
        <label for="mercredi">Mercredi</label>
        <br />
        <input type="checkbox" id="case4" name="jeudi" value="jeudi" />
        <label for="jeudi">Jeudi</label>
        <br />
        <input type="checkbox" id="case5" name="vendredi" value="vendredi" />
        <label for="vendredi">Vendredi</label>
        <br />
        <input type="checkbox" id="case6" name="samedi" value="samedi" />
        <label for="samedi">Samedi</label>
        <br />
        <input type="checkbox" id="case7" name="dimanche" value="dimanche" />
        <label for="dimanche">Dimanche</label>
      </form>
      <input
        type="submit"
        value="Envoyer"
        id="boutton"
        onClick={() => {
          tab1.push(data);
          console.table(tab1);
          console.table(dispo);
          document.getElementById("name").value = "";
          document.getElementById("adr").value = "";
          var semaine = document.querySelectorAll('input[type="checkbox"]');
          if (semaine[0].checked == true) {
            dispo[0].lundi++;
          }
          if (semaine[1].checked == true) {
            dispo[0].mardi++;
          }
          if (semaine[2].checked == true) {
            dispo[0].mercredi++;
          }
          if (semaine[3].checked == true) {
            dispo[0].jeudi++;
          }
          if (semaine[4].checked == true) {
            dispo[0].vendredi++;
          }
          if (semaine[5].checked == true) {
            dispo[0].samedi++;
          }
          if (semaine[6].checked == true) {
            dispo[0].dimanche++;
          }
          for (var i = 0; i < semaine.length; i++) {
            semaine[i].checked = false;
          }
        }}
      />
      <input
        type="reset"
        value="Ajouter"
        id="boutton"
        onClick={() => {
          tab1.push(data);
          console.table(tab1);
          document.getElementById("name").value = "";
          document.getElementById("adr").value = "";
          var semaine = document.querySelectorAll('input[type="checkbox"]');
          if (semaine[0].checked == true) {
            dispo[0].lundi++;
          }
          if (semaine[1].checked == true) {
            dispo[0].mardi++;
          }
          if (semaine[2].checked == true) {
            dispo[0].mercredi++;
          }
          if (semaine[3].checked == true) {
            dispo[0].jeudi++;
          }
          if (semaine[4].checked == true) {
            dispo[0].vendredi++;
          }
          if (semaine[5].checked == true) {
            dispo[0].samedi++;
          }
          if (semaine[6].checked == true) {
            dispo[0].dimanche++;
          }
          console.table(dispo);
          for (var i = 0; i < semaine.length; i++) {
            semaine[i].checked = false;
          }
        }}
      />
    </div>
  );
}

export default Formulaire;

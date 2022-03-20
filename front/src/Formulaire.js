import "./style/formulaire.css";
import { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import axios from "axios";

var tab1 = [
  { nom: "Blandine", adresse: "12 residence de paris" },
  { nom: "Université", adresse: "45 rue des Saints-Pères" },
  { nom: "", adresse: "" },
  { nom: "", adresse: "" },
  { nom: "", adresse: "" },
];

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

  function envoieData() {
    axios.post("http://localhost:3000/formulaire", { tab1 }).then((res) => {
      console.log(res.data);
    });
  }

  return (
    <div id="formulaire">
      <form>
        <label id="case" htmlform="name">
          Nom :
        </label>
        <input
          type="text"
          id="name"
          onChange={(e) => {
            setNom(e.target.value);
          }}
        />
        <label id="case" htmlform="adr">
          Adresse :
        </label>
        <Autocomplete
          id="adr"
          apiKey={process.env.GOOGLE_API_KEY}
          onPlaceSelected={(place, inputRef, autocomplete) => {
            console.log(place.geometry.location);
            setAdresse(place.formatted_address);
          }}
          options={{
            componentRestrictions: { country: "fr" },
          }}
        />
        <br />
        <label id="case">Disponibilité :</label>
        <br />
        <input type="checkbox" id="case1" name="lundi" value="lundi" />
        <label htmlform="lundi">Lundi</label>
        <br />
        <input type="checkbox" id="case2" name="mardi" value="mardi" />
        <label htmlform="mardi">Mardi</label>
        <br />
        <input type="checkbox" id="case3" name="mercredi" value="mercredi" />
        <label htmlform="mercredi">Mercredi</label>
        <br />
        <input type="checkbox" id="case4" name="jeudi" value="jeudi" />
        <label htmlform="jeudi">Jeudi</label>
        <br />
        <input type="checkbox" id="case5" name="vendredi" value="vendredi" />
        <label htmlform="vendredi">Vendredi</label>
        <br />
        <input type="checkbox" id="case6" name="samedi" value="samedi" />
        <label htmlform="samedi">Samedi</label>
        <br />
        <input type="checkbox" id="case7" name="dimanche" value="dimanche" />
        <label htmlform="dimanche">Dimanche</label>
      </form>
      <input
        type="submit"
        value="Envoyer"
        id="boutton"
        onClick={() => {
          tab1.push(data);
          document.getElementById("name").value = "";
          document.getElementById("adr").value = "";
          var semaine = document.querySelectorAll('input[type="checkbox"]');
          if (semaine[0].checked === true) {
            dispo[0].lundi++;
          }
          if (semaine[1].checked === true) {
            dispo[0].mardi++;
          }
          if (semaine[2].checked === true) {
            dispo[0].mercredi++;
          }
          if (semaine[3].checked === true) {
            dispo[0].jeudi++;
          }
          if (semaine[4].checked === true) {
            dispo[0].vendredi++;
          }
          if (semaine[5].checked === true) {
            dispo[0].samedi++;
          }
          if (semaine[6].checked === true) {
            dispo[0].dimanche++;
          }
          for (var i = 0; i < semaine.length; i++) {
            semaine[i].checked = false;
          }
          console.table(dispo);
          console.table(tab1);
          envoieData();
        }}
      />
      <input
        type="reset"
        value="Ajouter"
        id="boutton"
        onClick={() => {
          tab1.push(data);
          document.getElementById("name").value = "";
          document.getElementById("adr").value = "";
          var semaine = document.querySelectorAll('input[type="checkbox"]');
          if (semaine[0].checked === true) {
            dispo[0].lundi++;
          }
          if (semaine[1].checked === true) {
            dispo[0].mardi++;
          }
          if (semaine[2].checked === true) {
            dispo[0].mercredi++;
          }
          if (semaine[3].checked === true) {
            dispo[0].jeudi++;
          }
          if (semaine[4].checked === true) {
            dispo[0].vendredi++;
          }
          if (semaine[5].checked === true) {
            dispo[0].samedi++;
          }
          if (semaine[6].checked === true) {
            dispo[0].dimanche++;
          }
          for (var i = 0; i < semaine.length; i++) {
            semaine[i].checked = false;
          }
          console.table(dispo);
          console.table(tab1);
        }}
      />
    </div>
  );
}

export default Formulaire;

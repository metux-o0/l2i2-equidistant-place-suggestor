import "./style/formulaire.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";

function Inscritption() {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [latlng, setLatlng] = useState({});
  function convertToLatLng(adr) {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
    Geocode.enableDebug(false);
    Geocode.fromAddress(adr).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatlng({ lat, lng });
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  const tab1 = { nom, adresse, email, mdp, latlng };
  console.log(tab1);
  const envoieData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/inscription", {
        tab1,
      });
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    window.addEventListener("submit", envoieData);
    return () => {
      window.removeEventListener("submit", envoieData);
    };
  });
  //eslint-disable-next-line no-undef
  var sw = new google.maps.LatLng(48.42685436617363, 1.7682491688387136);
  //eslint-disable-next-line no-undef
  var ne = new google.maps.LatLng(49.152560974910976, 3.1150388469918466);
  //eslint-disable-next-line no-undef
  var bound = new google.maps.LatLngBounds(sw, ne);
  return (
    <div id="page">
      <div id="formulaire">
        <h2>Inscription</h2>
        <form>
          <label id="case" htmlform="name">
            Nom:
          </label>
          <input
            type="text"
            id="name"
            onChange={(e) => {
              setNom(e.target.value);
            }}
          />
          <br />
          <label id="case" htmlform="adr">
            Adresse :
          </label>
          <Autocomplete
            id="adr"
            apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            onPlaceSelected={(place, inputRef, autocomplete) => {
              convertToLatLng(place.formatted_address);
              setAdresse(place.formatted_address);
            }}
            options={{
              componentRestrictions: { country: "fr" },
              types: ["address"],
              bounds: bound,
            }}
          />
          <br />
          <label id="case" htmlform="email">
            Adresse mail:
          </label>
          <input
            type="text"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <label id="case" htmlform="email">
            Mot de passe:
          </label>
          <input
            type="text"
            id="mdp"
            onChange={(e) => {
              setMdp(e.target.value);
            }}
          />
          <br />
          <button type="submit" value="Envoyer"></button>
        </form>
      </div>
    </div>
  );
}
export default Inscritption;

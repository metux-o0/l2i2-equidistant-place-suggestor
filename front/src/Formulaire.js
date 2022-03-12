import "./style/formulaire.css";
import { useEffect, useState } from "react";
import axios from "axios";

var tab1 = [];

function Formulaire() {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [dispo, setDispo] = useState("");
  const data = { nom: nom, adresse: adresse, dispo: dispo };

  /*useEffect(() => {
    axios
      .get("http://localhost:3000/formulaire", { ...data })
      .then((res) => console.log(res.data.message));
  }, []);
  axios
    .post("http://localhost:3000/formulaire", { ...data })
    .then((res) => console.log(res.data.message));
*/
  function affiche() {
    alert(
      "Nom : " + nom + " Adresse : " + adresse + " Disponibilité : " + dispo
    );
  }

  return (
    <div id="formulaire">
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
        <select
          name="jour"
          multiple={true}
          size="7"
          onChange={(e) => {
            setDispo(e.target.value);
          }}
        >
          <option value="Lundi">Lundi</option>
          <option value="Mardi">Mardi</option>
          <option value="Mercredi">Mercredi</option>
          <option value="Jeudi">Jeudi</option>
          <option value="Vendredi">Vendredi</option>
          <option value="Samedi">Samedi</option>
          <option value="Dimanche">Dimanche</option>
        </select>
      </form>
      <input type="submit" value="Envoyer" id="boutton" onClick={affiche} />
      <input
        type="reset"
        value="Ajouter"
        id="boutton"
        onClick={() => {
          tab1.push(data);
          console.table(tab1);
          document.getElementById("name").value = "";
          document.getElementById("adr").value = "";
        }}
      />
    </div>
  );
}

export default Formulaire;

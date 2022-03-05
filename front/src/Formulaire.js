import "./style/formulaire.css";
import { useEffect, useState } from 'react';

function Formulaire() {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [dispo, setDispo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/formulaire")
      .then((res) => res.json())
      .then((nom) => setNom(nom))
      .then((adresse) => setAdresse(adresse));
    //.then((dispo) => setDispo(dispo));
  }, []);

  function affiche() {
    alert("Nom : " + nom + " Adresse : " + adresse);
  }

  return (
    <div id="formulaire">
      <form action="/log" method="post">
        <label>
          Nom :
          <input
            type="text"
            value={nom}
            onChange={(e) => {
              setNom(e.target.value);
            }}
          />
        </label>
        <label>
          Adresse :
          <input
            type="text"
            value={adresse}
            onChange={(e) => {
              setAdresse(e.target.value);
            }}
          />
        </label>
        <input type="submit" value="Envoyer" onClick={affiche} />
        <input type="button" value="Ajouter" />
      </form>
    </div>
  );
}

export default Formulaire;

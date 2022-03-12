import "./style/formulaire.css";
import { useEffect, useState } from "react";
import axios from "axios";

var nbform = 1;

/*function init()
  {
	  var divs = document.querySelectorAll("div");
	  for (var i = 0; i < divs.length-1; i++)
		  divs[i].addEventListener("change",enregistre , false);

	// Lance le calcul du total.
	// (Les sommes seront positinnées à zéro.)
  }

  function enregistre(){
    setAdresse(adresse.push(e))
  }

function getTd(ligne) {
  var result =
    '<div id="' +
    ligne +
    '"><label>Nom :</label><input type="text" onChange={(e) => {setNom(e.target.value);}}/><label>Adresse :</label><input type="text" onChange={(e) => {setAdresse(e.target.value);}}/><br />' +
    '<label>Disponibilité :</label><select name="jour"multiple={true} size="7" onChange={(e) => {setDispo(e.target.value);}}><option value="Lundi">Lundi</option><option value="Mardi">Mardi</option><option value="Mercredi">Mercredi</option><option value="Jeudi">Jeudi</option><option value="Vendredi">Vendredi</option><option value="Samedi">Samedi</option><option value="Dimanche">Dimanche</option></select></div>';
  return result;
}

function ajouterform() {
  var nouvelem = document.createElement('form');
  nouvelem.innerHTML = getTd(nbform++);

  var dernelem = document.getElementsByTagName('form');
  var parent = dernelem[dernelem.length - 1];
  parent.parentNode.insertBefore(nouvelem, parent);
}*/
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

  function affiche() {
    alert(
      "Nom : " + nom + " Adresse : " + adresse + " Disponibilité : " + dispo
    );
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
        <input
          type="checkbox"
          id="case"
          name="lundi"
          onClick={(e) => {
            dispo[0].lundi++;
          }}
        />
        <label>Lundi</label>
        <br />
        <input
          type="checkbox"
          id="case"
          name="mardi"
          onChange={(e) => {
            dispo[0].mardi++;
          }}
        />
        <label>Mardi</label>
        <br />
        <input
          type="checkbox"
          id="case"
          name="mercredi"
          onChange={(e) => {
            dispo[0].mercredi++;
          }}
        />
        <label>Mercredi</label>
        <br />
        <input
          type="checkbox"
          id="case"
          name="jeudi"
          onChange={(e) => {
            dispo[0].jeudi++;
          }}
        />
        <label>Jeudi</label>
        <br />
        <input
          type="checkbox"
          id="case"
          name="vendredi"
          onChange={(e) => {
            dispo[0].vendredi++;
          }}
        />
        <label>Vendredi</label>
        <br />
        <input
          type="checkbox"
          id="case"
          name="samedi"
          onChange={(e) => {
            dispo[0].samedi++;
          }}
        />
        <label>Samedi</label>
        <br />
        <input
          type="checkbox"
          id="case7"
          name="dimanche"
          onChange={(e) => {
            dispo[0].dimanche++;
          }}
        />
        <label>Dimanche</label>
      </form>
      <input type="submit" value="Envoyer" id="boutton" onClick={affiche} />
      <input
        type="reset"
        value="Ajouter"
        id="boutton"
        onClick={() => {
          tab1.push(data);
          console.table(tab1);
          console.table(dispo);
          document.getElementById("name").value = "";
          document.getElementById("adr").value = "";
        }}
      />
    </div>
  );
}

export default Formulaire;

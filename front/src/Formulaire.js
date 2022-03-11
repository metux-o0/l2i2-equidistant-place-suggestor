import './style/formulaire.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

var nbform = 1;

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
}

function Formulaire() {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [dispo, setDispo] = useState('');
  const data={nom:nom,adresse:adresse,dispo:dispo};

  useEffect(() => {
    axios
      .get('http://localhost:3000/formulaire', {...data})
      .then((res) => console.log(res));
  }, []);

  function affiche() {
    alert(
      'Nom : ' + nom + ' Adresse : ' + adresse + ' Disponibilité : ' + dispo
    );
  }

  return (
    <div id="formulaire" /*onLoad={init}*/>
      <form action="/log" method="post">
        <div id="0">
          <label id='case'>Nom :</label>
          <input
            type="text"
            onChange={(e) => {
              setNom(e.target.value);
            }}
          />
          <label id='case'>Adresse :</label>
          <input
            type="text"
            onChange={(e) => {
              setAdresse(e.target.value);
            }}
          />
          <br />
          <label id='case'>Disponibilité :</label>
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
        </div>
      </form>
      <input type="submit" value="Envoyer" id='boutton' onClick={affiche} />
      <input type="button" value="Ajouter" id='boutton' onClick={ajouterform} />
    </div>
  );
}

export default Formulaire;

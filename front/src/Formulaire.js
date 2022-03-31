import './style/formulaire.css';
import { useState, useEffect } from 'react';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';
import axios from 'axios';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '500px',
};

const prochain_jour_numero = () => {
  const date_now = new Date();
  const array = [];
  for (let i = 0; i < 7; i++) {
    array.push(date_now.toString());
    date_now.setDate(date_now.getDate() + 1);
  }
  const array_jour = [];
  let jour = null;
  let mois = null;
  for (let i = 0; i < 7; i++) {
    if (array[i].substring(0, 3) === 'Mon') {
      jour = 'Lundi';
    } else if (array[i].substring(0, 3) === 'Tue') {
      jour = 'Mardi';
    } else if (array[i].substring(0, 3) === 'Wed') {
      jour = 'Mercredi';
    } else if (array[i].substring(0, 3) === 'Thu') {
      jour = 'Jeudi';
    } else if (array[i].substring(0, 3) === 'Fri') {
      jour = 'Vendredi';
    } else if (array[i].substring(0, 3) === 'Sat') {
      jour = 'Samedi';
    } else if (array[i].substring(0, 3) === 'Sun') {
      jour = 'Dimanche';
    }

    switch (array[i].substring(4, 7)) {
      case 'Jan':
        mois = 'Janvier';
        break;
      case 'Feb':
        mois = 'Février';
        break;
      case 'Mar':
        mois = 'Mars';
        break;
      case 'Apr':
        mois = 'Avril';
        break;
      case 'May':
        mois = 'Mai';
        break;
      case 'Jun':
        mois = 'Juin';
        break;
      case 'Jul':
        mois = 'Juillet';
        break;
      case 'Aug':
        mois = 'Aout';
        break;
      case 'Sep':
        mois = 'Septembre';
        break;
      case 'Oct':
        mois = 'Octobre';
        break;
      case 'Nov':
        mois = 'Novembre';
        break;
      default:
        mois = 'Décembre';
    }
    array_jour.push(jour + ' ' + array[i].substring(8, 10) + ' ' + mois);
  }
  return array_jour;
};
const prochain_jour = () => {
  const date_now = new Date();
  const array = [];
  for (let i = 0; i < 7; i++) {
    array.push(date_now.toString());
    date_now.setDate(date_now.getDate() + 1);
  }
  const array_jour = [];
  let jour = null;
  for (let i = 0; i < 7; i++) {
    if (array[i].substring(0, 3) === 'Mon') {
      jour = 'Lundi';
    } else if (array[i].substring(0, 3) === 'Tue') {
      jour = 'Mardi';
    } else if (array[i].substring(0, 3) === 'Wed') {
      jour = 'Mercredi';
    } else if (array[i].substring(0, 3) === 'Thu') {
      jour = 'Jeudi';
    } else if (array[i].substring(0, 3) === 'Fri') {
      jour = 'Vendredi';
    } else if (array[i].substring(0, 3) === 'Sat') {
      jour = 'Samedi';
    } else if (array[i].substring(0, 3) === 'Sun') {
      jour = 'Dimanche';
    }
    array_jour.push(jour.toLowerCase());
  }
  return array_jour;
};
const prochainjn = prochain_jour_numero();
const prochain = prochain_jour();

var tab1 = [
  {
    nom: 'Université',
    adresse: '45 rue des Saints-Pères',
    latlng: { lat: 48.85522290905313, lng: 2.3319466418882806 },
  },
];

function jourMax(dispo) {
  var tab_dispo = Object.keys(dispo[0]).map(function (key) {
    return [key, dispo[0][key]];
  });
  //Trouve le max
  var max = tab_dispo[0][1];
  for (var i = 1; i < 7; i++) {
    if (tab_dispo[i][1] > max) {
      max = tab_dispo[i][1];
    }
  }
  //Trouve les jours correspondands au max
  var tab_jour = [];
  for (var j = 0; j < 7; j++) {
    if (max === tab_dispo[j][1]) {
      tab_jour.push(tab_dispo[j][0]);
    }
  }
  return tab_jour;
}

function Formulaire() {
  const [pin, setPin] = useState(1);
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [latlng, setLatlng] = useState({});
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [datesDispo, setDatesDispo] = useState([]);

  const [dispo] = useState([
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
  var dateChoisie;
  const data = { nom, adresse, latlng };

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
  const envoieData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        .post('http://localhost:3000/formulaire', {
          tab1,
          dateChoisie,
        })
        .then((response) => {
          setMarkers(response.data);
          console.log(response.data);
          console.log('envoyer');
        });
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    window.addEventListener('submit', envoieData);
    return () => {
      window.removeEventListener('submit', envoieData);
    };
  }, []);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  return isLoaded ? (
    <div id="page">
      <div id="formulaire">
        <h2>Personne {pin}</h2>
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
              componentRestrictions: { country: 'fr' },
              types: ['geocode', 'establishment'],
            }}
          />
          <br />
          <br />
          <label id="case">Disponibilité :</label>
          <br />
          <br />
          <input
            type="checkbox"
            id="case1"
            name={prochain[0]}
            value={prochain[0]}
          />
          <label htmlform={prochain[0]}>{prochainjn[0]}</label>
          <br />
          <input
            type="checkbox"
            id="case2"
            name={prochain[1]}
            value={prochain[1]}
          />
          <label htmlform={prochain[1]}>{prochainjn[1]}</label>
          <br />
          <input
            type="checkbox"
            id="case3"
            name={prochain[2]}
            value={prochain[2]}
          />
          <label htmlform={prochain[2]}>{prochainjn[2]}</label>
          <br />
          <input
            type="checkbox"
            id="case4"
            name={prochain[3]}
            value={prochain[3]}
          />
          <label htmlform={prochain[3]}>{prochainjn[3]}</label>
          <br />
          <input
            type="checkbox"
            id="case5"
            name={prochain[4]}
            value={prochain[4]}
          />
          <label htmlform={prochain[4]}>{prochainjn[4]}</label>
          <br />
          <input
            type="checkbox"
            id="case6"
            name={prochain[5]}
            value={prochain[5]}
          />
          <label htmlform={prochain[5]}>{prochainjn[5]}</label>
          <br />
          <input
            type="checkbox"
            id="case7"
            name={prochain[6]}
            value={prochain[6]}
          />
          <label htmlform={prochain[6]}>{prochainjn[6]}</label>
          <br />
          <button
            type="submit"
            value="Envoyer"
            id="boutton"
            onClick={() => {
              tab1.push(data);
              document.getElementById('name').value = '';
              document.getElementById('adr').value = '';
              var semaine = document.querySelectorAll('input[type="checkbox"]');
              const prochain1 = prochain_jour();
              const verification = (jour) => {
                if (jour === 'lundi') {
                  dispo[0].lundi++;
                } else if (jour === 'mardi') {
                  dispo[0].mardi++;
                } else if (jour === 'mercredi') {
                  dispo[0].mercredi++;
                } else if (jour === 'jeudi') {
                  dispo[0].jeudi++;
                } else if (jour === 'vendredi') {
                  dispo[0].vendredi++;
                } else if (jour === 'samedi') {
                  dispo[0].samedi++;
                } else if (jour === 'dimanche') {
                  dispo[0].dimanche++;
                }
              };
              if (semaine[0].checked === true) {
                verification(prochain1[0]);
              } else if (semaine[1].checked === true) {
                verification(prochain1[1]);
              } else if (semaine[2].checked === true) {
                verification(prochain1[2]);
              } else if (semaine[3].checked === true) {
                verification(prochain1[3]);
              } else if (semaine[4].checked === true) {
                verification(prochain1[4]);
              } else if (semaine[5].checked === true) {
                verification(prochain1[5]);
              }
              for (var i = 0; i < semaine.length; i++) {
                semaine[i].checked = false;
              }
              console.table(dispo);
              console.table(tab1);
              dateChoisie = jourMax(dispo);
              setPin(tab1.length);
            }}
          >
            Envoyer
          </button>
          <button
            type="reset"
            value="Ajouter"
            id="boutton"
            onClick={() => {
              tab1.push(data);
              document.getElementById('name').value = '';
              document.getElementById('adr').value = '';
              var semaine = document.querySelectorAll('input[type="checkbox"]');
              const prochain1 = prochain_jour();
              const verification = (jour) => {
                if (jour === 'lundi') {
                  dispo[0].lundi++;
                } else if (jour === 'mardi') {
                  dispo[0].mardi++;
                } else if (jour === 'mercredi') {
                  dispo[0].mercredi++;
                } else if (jour === 'jeudi') {
                  dispo[0].jeudi++;
                } else if (jour === 'vendredi') {
                  dispo[0].vendredi++;
                } else if (jour === 'samedi') {
                  dispo[0].samedi++;
                } else if (jour === 'dimanche') {
                  dispo[0].dimanche++;
                }
              };
              if (semaine[0].checked === true) {
                verification(prochain1[0]);
              }
              if (semaine[1].checked === true) {
                verification(prochain1[1]);
              }
              if (semaine[2].checked === true) {
                verification(prochain1[2]);
              }
              if (semaine[3].checked === true) {
                verification(prochain1[3]);
              }
              if (semaine[4].checked === true) {
                verification(prochain1[4]);
              }
              if (semaine[5].checked === true) {
                verification(prochain1[5]);
              }
              if (semaine[6].checked === true) {
                verification(prochain1[6]);
              }
              console.table(dispo);
              console.table(tab1);
              setPin(tab1.length);
            }}
          >
            Ajouter
          </button>
        </form>
        <GoogleMap
          id="carte"
          mapContainerStyle={containerStyle}
          center={{ lat: 48.86380957985594, lng: 2.3443822975053807 }}
          zoom={11}
        >
          {markers.map((res) => {
            console.log('okk');
            console.log(res);
            return (
              <div>
                <Marker
                  key={res.nom}
                  label={res.nom}
                  position={{
                    lat: res.latlng.lat,
                    lng: res.latlng.lng,
                  }}
                />
              </div>
            );
          })}
        </GoogleMap>
      </div>
      <h4>Date Disponibilité : {dateChoisie}</h4>
    </div>
  ) : (
    <></>
  );
}

export default Formulaire;

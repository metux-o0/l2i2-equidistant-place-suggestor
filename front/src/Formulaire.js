import "./style/formulaire.css";
import { useState, useEffect, useRef } from "react";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import axios from "axios";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "600px",
  height: "500px",
};

const svgMarker = {
  path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
  fillColor: "blue",
  fillOpacity: 1,
  strokeWeight: 0,
  rotation: 0,
  scale: 2,
  //eslint-disable-next-line no-undef
  anchor: new google.maps.Point(15, 30),
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
    if (array[i].substring(0, 3) === "Mon") {
      jour = "Lundi";
    } else if (array[i].substring(0, 3) === "Tue") {
      jour = "Mardi";
    } else if (array[i].substring(0, 3) === "Wed") {
      jour = "Mercredi";
    } else if (array[i].substring(0, 3) === "Thu") {
      jour = "Jeudi";
    } else if (array[i].substring(0, 3) === "Fri") {
      jour = "Vendredi";
    } else if (array[i].substring(0, 3) === "Sat") {
      jour = "Samedi";
    } else if (array[i].substring(0, 3) === "Sun") {
      jour = "Dimanche";
    }

    switch (array[i].substring(4, 7)) {
      case "Jan":
        mois = "Janvier";
        break;
      case "Feb":
        mois = "Février";
        break;
      case "Mar":
        mois = "Mars";
        break;
      case "Apr":
        mois = "Avril";
        break;
      case "May":
        mois = "Mai";
        break;
      case "Jun":
        mois = "Juin";
        break;
      case "Jul":
        mois = "Juillet";
        break;
      case "Aug":
        mois = "Aout";
        break;
      case "Sep":
        mois = "Septembre";
        break;
      case "Oct":
        mois = "Octobre";
        break;
      case "Nov":
        mois = "Novembre";
        break;
      default:
        mois = "Décembre";
    }
    array_jour.push(jour + " " + array[i].substring(8, 10) + " " + mois);
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
    if (array[i].substring(0, 3) === "Mon") {
      jour = "Lundi";
    } else if (array[i].substring(0, 3) === "Tue") {
      jour = "Mardi";
    } else if (array[i].substring(0, 3) === "Wed") {
      jour = "Mercredi";
    } else if (array[i].substring(0, 3) === "Thu") {
      jour = "Jeudi";
    } else if (array[i].substring(0, 3) === "Fri") {
      jour = "Vendredi";
    } else if (array[i].substring(0, 3) === "Sat") {
      jour = "Samedi";
    } else if (array[i].substring(0, 3) === "Sun") {
      jour = "Dimanche";
    }
    array_jour.push(jour.toLowerCase());
  }
  return array_jour;
};
const prochainjn = prochain_jour_numero();
const prochain = prochain_jour();

var tab1 = [];

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
  const [pin, setPin] = useState(0);
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [activite, setActivite] = useState("");
  const [latlng, setLatlng] = useState({});
  const [markers, setMarkers] = useState([]);
  const [datesDispo, setDatesDispo] = useState([]);
  const [resto, setResto] = useState([]);
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
  const scroll = useRef(null);

  const [directionResponse, setDirectionResponse] = useState([]);
  const [distance, setDistance] = useState([]);
  const [duree, setDuree] = useState([]);

  async function calculerRoute(adresse, restaurant) {
    //eslint-disable-next-line no-undef
    const directionRender = new google.maps.DirectionsRenderer();
    //eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: adresse.adresse,
      destination: restaurant.adresse,
      //eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.TRANSIT,
    });

    directionResponse.push(result);
    setDirectionResponse(
      directionResponse.filter(function (ele, pos) {
        return directionResponse.indexOf(ele) === pos;
      })
    );

    distance.push(result.routes[0].legs[0].distance.text);
    duree.push(result.routes[0].legs[0].duration.text);
    delete result.routes[0].warnings;
    delete result.routes[0].copyrights;
    directionRender.setDirections(result);
    directionRender.setPanel(document.getElementById("panel"));
  }

  function convertToLatLng(adr) {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
    Geocode.enableDebug(false);
    Geocode.fromAddress(adr).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatlng({ lat, lng });
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
        .post("http://localhost:3000/formulaire", {
          tab1,
          dateChoisie,
          activite,
        })
        .then((response) => {
          setMarkers(response.data);
          resto.push(response.data[response.data.length - 1].nom);
          resto.push(response.data[response.data.length - 1].adresse);
          resto.push(response.data[response.data.length - 1].specialite);
          resto.push(response.data[response.data.length - 1].ouverture);
          for (var j = 0; j < response.data.length - 1; j++) {
            calculerRoute(
              response.data[j],
              response.data[response.data.length - 1]
            );
          }
        });
    } catch (e) {
      console.log(e);
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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    //libraries: ['places'],
  });
  return isLoaded ? (
    <div id="page">
      <div id="formulaire">
        <h2 id="personne">Personne {pin + 1}</h2>
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
              componentRestrictions: { country: "fr" },
              types: ["address"],
              bounds: bound,
            }}
          />
          <br />
          <div onChange={(e) => setActivite(e.target.value)}>
            <label id="activite">Type d'activité :</label>
            <label>
              Restaurant
              <input type="radio" name="activite" value="restaurant" />
            </label>
            <label>
              Sport
              <input type="radio" name="activite" value="sport" />
            </label>
            <label>
              Tourisme
              <input type="radio" name="activite" value="tourisme" />
            </label>
          </div>
          <br />
          <label id="case">Disponibilité :</label>
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
            id="case1"
            name={prochain[1]}
            value={prochain[1]}
          />
          <label htmlform={prochain[1]}>{prochainjn[1]}</label>
          <br />
          <input
            type="checkbox"
            id="case1"
            name={prochain[2]}
            value={prochain[2]}
          />
          <label htmlform={prochain[2]}>{prochainjn[2]}</label>
          <br />
          <input
            type="checkbox"
            id="case1"
            name={prochain[3]}
            value={prochain[3]}
          />
          <label htmlform={prochain[3]}>{prochainjn[3]}</label>
          <br />
          <input
            type="checkbox"
            id="case1"
            name={prochain[4]}
            value={prochain[4]}
          />
          <label htmlform={prochain[4]}>{prochainjn[4]}</label>
          <br />
          <input
            type="checkbox"
            id="case1"
            name={prochain[5]}
            value={prochain[5]}
          />
          <label htmlform={prochain[5]}>{prochainjn[5]}</label>
          <br />
          <input
            type="checkbox"
            id="case1"
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
              document.getElementById("name").value = "";
              document.getElementById("adr").value = "";
              var semaine = document.querySelectorAll('input[id="case1"]');
              const prochain1 = prochain_jour();
              const verification = (jour) => {
                if (jour === "lundi") {
                  dispo[0].lundi++;
                } else if (jour === "mardi") {
                  dispo[0].mardi++;
                } else if (jour === "mercredi") {
                  dispo[0].mercredi++;
                } else if (jour === "jeudi") {
                  dispo[0].jeudi++;
                } else if (jour === "vendredi") {
                  dispo[0].vendredi++;
                } else if (jour === "samedi") {
                  dispo[0].samedi++;
                } else if (jour === "dimanche") {
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
              setDatesDispo(jourMax(dispo));
              setPin(tab1.length);
              scroll.current.scrollIntoView();
            }}
          >
            Valider
          </button>
          <button
            type="reset"
            value="Ajouter"
            id="boutton"
            onClick={() => {
              tab1.push(data);
              document.getElementById("name").value = "";
              document.getElementById("adr").value = "";
              var semaine = document.querySelectorAll('input[id="case1"]');
              const prochain1 = prochain_jour();
              const verification = (jour) => {
                if (jour === "lundi") {
                  dispo[0].lundi++;
                } else if (jour === "mardi") {
                  dispo[0].mardi++;
                } else if (jour === "mercredi") {
                  dispo[0].mercredi++;
                } else if (jour === "jeudi") {
                  dispo[0].jeudi++;
                } else if (jour === "vendredi") {
                  dispo[0].vendredi++;
                } else if (jour === "samedi") {
                  dispo[0].samedi++;
                } else if (jour === "dimanche") {
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
          zoom={12}
        >
          {directionResponse.map((res, index) => {
            return (
              <DirectionsRenderer
                directions={res}
                options={{
                  polylineOptions: {
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.5,
                    strokeWeight: 4,
                  },
                  icon: { scale: 3 },
                  markerOptions: {
                    icon: " ",
                  },
                }}
              />
            );
          })}
          {markers.map((res, index) => {
            console.log(res);
            if (index === tab1.length) {
              return (
                <div>
                  <Marker
                    id="marker"
                    key={index}
                    position={res.latlng}
                    label={res.nom}
                    icon={svgMarker}
                  />
                </div>
              );
            } else {
              return (
                <div>
                  <Marker
                    id="marker"
                    key={index}
                    position={res.latlng}
                    label={res.nom}
                  />
                </div>
              );
            }
          })}
        </GoogleMap>
      </div>
      <h4 id="dispo">Date Disponibilité : </h4>
      {datesDispo.map((res, index) => {
        return <h4 id="dispo_jour">{datesDispo[index]}</h4>;
      })}
      <br />
      <div id="restaurant">
        <h3 ref={scroll}>{resto[0]}</h3>
        <hr></hr>
        <h4>{resto[1]}</h4>
        <h4>Spécialité : {resto[2]}</h4>
        <h4>Ouvert : {resto[3]}</h4>
      </div>
      <br />
      <div id="panel"></div>
    </div>
  ) : (
    <></>
  );
}
export default Formulaire;

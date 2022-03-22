import "./style/maps.css";
import { useEffect } from "react";
import React from "react";
import axios from "axios";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "600px",
  height: "500px",
};

function Maps() {
  function affichedd(a) {
    console.log(a);
  }

  function ajoutMarker(latlng) {
    var marker = new window.google.maps.Marker({
      position: latlng,
      map: document.getElementById("carte"),
      title: "Nouveau PIN",
    });
  }
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/carte`)
      .then((res) => {
        for (var i = 0; i < res.data.tab1.length; i++) {
          affichedd(res.data.tab1[i].nom);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  return isLoaded ? (
    <div>
      <GoogleMap
        id="carte"
        mapContainerStyle={containerStyle}
        type={"restaurant"}
        center={{ lat: 48.86380957985594, lng: 2.3443822975053807 }}
        zoom={11}
        onClick={(e) => {
          console.log(e);
        }}
      >
        <Marker
          position={{ lat: 48.86380957985594, lng: 2.3443822975053807 }}
        />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Maps);

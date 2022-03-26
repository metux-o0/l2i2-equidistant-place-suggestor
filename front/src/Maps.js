import './style/maps.css';
import Formulaire from './Formulaire';
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '500px',
};

function Maps() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [datesDispo, setDatesDispo] = useState(['lundi', 'samedi']);

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/carte');
      setMarkers(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    window.addEventListener('click', getData);
    return () => {
      window.removeEventListener('click', getData);
    };
  }, [markers]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  return isLoaded ? (
    <div>
      <h4>Date Disponibilité : {datesDispo}</h4>
      <GoogleMap
        id="carte"
        mapContainerStyle={containerStyle}
        center={{ lat: 48.86380957985594, lng: 2.3443822975053807 }}
        zoom={11}
        onClick={(e) => {
          console.log(e);
        }}
      >
        {markers.map((res) => {
          return (
            <div>
              <Marker
                key={res.nom}
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
  ) : (
    <></>
  );
}

export default React.memo(Maps);

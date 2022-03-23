import { google, createMarker, place, marker } from "google-maps-react";

function Restau() {
  let map;
  let service;
  let infowindow;

  const sydney = new google.maps.LatLng(48.854270935058594, 2.3303446769714355);
  const request = {
    query: "Paris",
    fields: ["name", "geometry"],
  };
  <Restau>
    function initMap(){""}
    {
      ((infowindow = new google.maps.InfoWindow()),
      (map = new google.maps.Map(document.getElementById("map"))),
      {
        center: "paris",
        zoom: 15,
      })
    }
    <input
      type="submit"
      value="Trouver"
      id="boutton"
      onClick={() => {
        service = new google.maps.places.PlacesService(map);
        service.findPlaceFromQuery(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
            map.setCenter(results[0].geometry.location);
          }
        });
      }}
    />
    const marker = new google.maps.Marker( map, position=
    place.geometry.location, ); function createMarker(place){" "}
    {
      <input
        type="submit"
        value="Marker"
        id="boutton"
        onClick={() => {
          if (!place.geometry || !place.geometry.location) return;
          google.maps.event.addListener(marker, "click", () => {
            infowindow.setContent(place.name || "");
            infowindow.open(map);
          });
        }}
      />
    }
  </Restau>;
}

export default Restau;

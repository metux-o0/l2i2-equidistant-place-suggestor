import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAdress,
  getLating,
} from "react-places-autocomplete";
const mapStyles = {
  height: "400px",
  width: "600px",
  margintop: "0.6em",
};
export class MapContainer extends Component {
  render() {
    return (
      <center>
        <Map
          google={this.props.google}
          zoom={16}
          style={mapStyles}
          initialCenter={{
            lat: 48.854270935058594,
            lng: 2.3303446769714355,
          }}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={"45 rue des Saint Pères, 75006 Paris"}
          />
        </Map>
      </center>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);

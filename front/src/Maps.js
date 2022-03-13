import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./style/maps.css";
import Formulaire from "./Formulaire";

const cle=process.env.API_KEY;

const position = [48.86380957985594, 2.3443822975053807];

function Maps() {
  return (
    <div>
      <Formulaire />
      <MapContainer center={position} zoom={11}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>Vous êtes ici</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Maps;

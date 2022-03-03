import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const position = [48.86380957985594, 2.3443822975053807];
function Maps() {
  return (
    <MapContainer center={position} zoom={12}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[48.86380957985594, 2.3443822975053807]}>
        <Popup>Vous êtes ici</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Maps;

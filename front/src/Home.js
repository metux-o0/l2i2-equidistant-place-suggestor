import './style/home.css';
import {
  Marker,
  MapContainer,
  TileLayer,
} from 'react-leaflet';

function Home() {
  return (
    <div className="home">
      <h1>Accueil</h1>
      <p id="slogan">
        Profitons de notre jour de repos, qui ne tombe pas à l'eau avec ...
      </p>
      <MapContainer
        id="carte1"
        center={{ lat: 48.86380957985594, lng: 2.3443822975053807 }}
        zoom={11}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[48.86380957985594, 2.3443822975053807]}></Marker>
      </MapContainer>
    </div>
  );
}

export default Home;

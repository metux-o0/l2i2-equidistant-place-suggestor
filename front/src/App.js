import Formulaire from "./Formulaire";
import Nav from "./Navigateur";
import Home from "./Home";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Contact from "./Contact";

function App() {
  return (
    <div>
      <Header />
      <Nav></Nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/formulaire" element={<Formulaire />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <img
        src="https://cdn.icon-icons.com/icons2/2249/PNG/512/map_marker_radius_outline_icon_139389.png"
        id="logotest"
      />
    </div>
  );
}

export default App;

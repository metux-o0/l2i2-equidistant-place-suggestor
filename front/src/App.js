import Formulaire from "./Formulaire";
import Nav from "./Navigateur";
import Home from "./Home";
import Header from "./Header";
import Maps from "./Maps";
import { Route, Routes } from "react-router-dom";
import Autocomplete from "./Autocomplete";
import Restau from "./Restau";

function App() {
  return (
    <div>
      <Header />
      <Nav></Nav>
      <Autocomplete onchange={() => null} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/formulaire" element={<Restau />} />
        <Route path="/carte" element={<Formulaire />} />
      </Routes>
    </div>
  );
}

export default App;

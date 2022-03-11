import Formulaire from "./Formulaire";
import Nav from "./Navigateur";
import Home from "./Home";
import Header from "./Header";
import Maps from "./Maps";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Nav></Nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/formulaire" element={<Formulaire />} />
        <Route path="/carte" element={<Maps />} />
      </Routes>
    </div>
  );
}

export default App;

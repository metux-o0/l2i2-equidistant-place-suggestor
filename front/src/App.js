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

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/formulaire" element={<Formulaire />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;

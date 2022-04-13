import Formulaire from "./Formulaire";
import Home from "./Home";
import Header from "./Header";
import Inscription from "./Inscription";
import Connexion from "./Connexion";

import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Contact from "./Contact";
import Chat from "./Chat";
=======
>>>>>>> b3374433300cf6f30e03bd7404c297f632765c08

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/formulaire" element={<Formulaire />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;

import "./style/formulaire.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const envoieData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/inscription", {
        tab1,
      });
    } catch (e) {
      alert(e);
    }
  };
  const tab1 = [];
  useEffect(() => {
    window.addEventListener("submit", envoieData);
    return () => {
      window.removeEventListener("submit", envoieData);
    };
  });
  return (
    <div id="page">
      <div id="formulaire">
        <h2>Connexion</h2>
        <form>
          <label id="case" htmlform="email">
            Adresse mail:
          </label>
          <input
            type="text"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <label id="case" htmlform="email">
            Mot de passe:
          </label>
          <input
            type="text"
            id="mdp"
            onChange={(e) => {
              setMdp(e.target.value);
            }}
          />
          <br />
          <button type="submit" value="Envoyer">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};
export default Connexion;

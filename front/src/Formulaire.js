import "./style/formulaire.css";
import { Link } from "react-router-dom";

function Formulaire() {
  return (
    <div className="form">
      <h2>Formulaire</h2>
      <form action="/log" method="post" id="formu">
        <br />
        <label for="nom">Nom : </label>
        <input type="text" name="nom" id="nom" required autofocus />
        <br />
        <label for="adresse">Adresse : </label>
        <input type="text" name="adresse" id="adresse" required />
        <br />
      </form>
      <br />
      <Link to="/formulaire">Ajouter</Link>
    </div>
  );
}

export default Formulaire;

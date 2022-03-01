import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="nav">
      <div>
        <Link exact to="/" activeClassName="nav_active">Accueil</Link>
        <p></p>
        <Link to="/formulaire" activeClassName="nav_active">Formulaire</Link>
        <p></p>
        <Link to="/carte" activeClassName="nav_active">Carte</Link>
      </div>
    </nav>
  );
}

export default Nav;

import { Link } from 'react-router-dom';
import './style/nav.css'

function Nav() {
  return (
    <nav className="nav">
      <ul>
        <li><Link exact to="/" activeClassName="nav_active" id='link'>Accueil</Link></li>
        <li><Link to="/formulaire" activeClassName="nav_active" id='link'>Formulaire</Link></li>
        <li><Link to="/carte" activeClassName="nav_active" id='link'>Carte</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;

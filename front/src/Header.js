import "./style/Header.css";
import Nav from "./Navigateur";
function Header() {
  return (
    <div>
      <header>
        <div id="img">
          <img src="logo.jpg"></img>
        </div>
        <h1>Equi Meet </h1>
        <Nav />
      </header>
    </div>
  );
}

export default Header;

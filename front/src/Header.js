import "./style/Header.css";
import Nav from "./Navigateur";
function Header() {
  return (
    <div>
      <header>
        <h1> Equi Meet </h1>
        <div id="navi">
          <Nav />
        </div>
      </header>
      <div id="img">
        <img src="logo.jpg"></img>
      </div>
    </div>
  );
}

export default Header;

import "./style/home.css";

function Home() {
  return (
    <div className="home">
      <br />
      <p id="slogan">
        Profitons de notre jour de repos, qui ne tombe pas à l'eau
      </p>
      <img src="restau.jpg" />
      <p id="presentation">
        L'application web a pour but de suggérer un lieu de sortie à
        équidistance des membres d’un groupe d’utilisateurs afin de faciliter
        les rendez-vous professionnels et personnels.
        <br />
        <br />
        Les utilisateurs renseignent leur adresse et sélectionnent leurs
        disponibilités sur les sept prochains jours, puis l’application leur
        propose un restaurant parmi ceux à proximité ainsi qu’un créneau en
        commun.
        <br />
        <br />
        L’application affichera par la suite le trajet le plus court pour chacun
        des membres et également la distance à parcourir.
      </p>
      <br />
      <div>
        <button
          type="submit"
          value="Commencer"
          id="boutton"
          onClick={() => {
            document.location.href = "./Formulaire";
          }}
        >
          Commencer
        </button>
      </div>
    </div>
  );
}

export default Home;

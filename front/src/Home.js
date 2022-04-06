import "./style/home.css";

function Home() {
  return (
    <div className="home">
      <br />
      <p id="slogan">
        Profitons de notre jour de repos, qui ne tombe pas à l'eau
        <i>Blandine</i>
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

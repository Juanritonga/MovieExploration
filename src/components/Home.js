import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/film");
  };

  return (
    <div className="Home">
      <div className="marquee">
        <div className="marquee-text">
          Selamat Datang di Popcorn Central, Temukan Rekomendasi Film Sesuai
          Mood Kamu
        </div>
      </div>
      <div className="left-center-text">
        <div>POPCORN</div>
        <div>CENTRAL</div>
        <button onClick={handleButtonClick} className="start-button">
          Start
        </button>
      </div>
    </div>
  );
}

export default Home;

import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="text-container">
        <div className="wrapper">
          <img src="/depto.jpg" alt="imgTablet" className="img-tablet" />
          <h1 className="title">Encontrá el lugar perfecto para vos</h1>
          <p>
            Nos especializamos en ofrecer las mejores opciones de alquiler para
            que puedas encontrar el lugar que estás buscando.
          </p>
          <SearchBar />
          <h4 className="title-ciudad">Elegí que ciudad</h4>
          <div className="menu-ciudad">
            <button onClick={() => navigate(`/list?search=caba`)}>
              <span>Buenos Aires</span>
            </button>
            <button onClick={() => navigate(`/list?search=madrid`)}>
              <span>Madrid</span>
            </button>
          </div>
        </div>
      </div>
      <div className="img-container">
        <img src="/depto3.jpg" alt="depto" />
      </div>
    </div>
  );
}

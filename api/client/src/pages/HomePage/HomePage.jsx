import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function HomePage() {
  const navigate = useNavigate();

  const images = [
    {
      original: "/foto-portada-1.jpg",
      thumbnail: "",
      originalHeight: "550px",
    },
    {
      original: "/foto-portada-2.jpg",
      thumbnail: "",
      originalHeight: "550px",
      loading: "lazy",
    },
    {
      original: "/foto-portada-3.jpg",
      thumbnail: "",
      originalHeight: "550px",
      loading: "lazy",
    },
  ];

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
        {/* <img src="/foto-portada.jpg" alt="portada" /> */}
        <ImageGallery
          items={images}
          autoPlay={true}
          showNav={false}
          showFullscreenButton={false}
          showPlayButton={false}
          slideInterval={10000}
          slideDuration={1000}
        />
      </div>
    </div>
  );
}

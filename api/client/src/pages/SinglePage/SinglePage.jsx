//import { useParams } from "react-router-dom";
import Slider from "../../components/slider/Slider";
import "./singlePage.scss";
import Map from "../../components/map/Map";
import ContactForm from "../../components/contactForm/ContactForm";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

export default function SinglePage() {
  const { currentUser } = useContext(AuthContext);
  const post = useLoaderData();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/update-post/${post.id}`);
  };

  const handleDelete = async () => {
    if (confirm("¿Estás seguro/a de eliminar esta publicación?")) {
      try {
        setLoading(true);
        const res = await apiRequest.delete(`/posts/${post.id}`);
        console.log(res);
        navigate("/list");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      return;
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <div className="street">
                    <img src="/pin.png" alt="pin" />
                    <span>{post.address}</span>
                  </div>
                  <div className="city">
                    <p>{post.city}</p>
                  </div>
                </div>
                <div className="price">
                  ${post.price}
                  <p className="expenses">Expensas: ${post.expenses}</p>
                </div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="user" />
                <span>{post.user.username} </span>
              </div>
            </div>
            <div className="bottom">
              <div className="description">{post.postDetail.description}</div>
              {currentUser &&
                (currentUser.admin || currentUser.id === post.userId) && (
                  <div className="user-actions">
                    <button className="update" onClick={handleUpdate}>
                      Modificar Publicación
                    </button>
                    <button
                      className="delete"
                      onClick={handleDelete}
                      disabled={loading}
                    >
                      Eliminar Publicación
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <div className="contactContainer">
            <p className="title">Contactar</p>
            <ContactForm postTitle={post.title} />
          </div>
          <p className="title">Características</p>
          <div className="listVertical">
            <div className="feature">
              <p className="type">Tipo: {post.type}</p>
            </div>
            <div className="feature">
              <p className="petPolicy">
                Admite mascotas: {post.postDetail.pet}
              </p>
            </div>
            <div className="feature">
              <p className="pool">Piscina: {post.postDetail.pool}</p>
            </div>
            <div className="feature">
              <p className="laundry">Laundry: {post.postDetail.laundry}</p>
            </div>
          </div>
          <p className="title">Dimensiones</p>
          <div className="sizes">
            <div className="size">
              <img src="/puerta.png" alt="rooms" />
              <span>{post.rooms} amb</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="bath" />
              <span>{post.bathroom} baño/s</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="bed" />
              <span>{post.beds} cama/s</span>
            </div>
            <div className="size">
              <img src="/m2.png" alt="size" />
              <span>{post.size} m2</span>
            </div>
          </div>
          <p className="title">Requisitos de alquiler</p>
          <div className="listVertical">
            <p className="requisites">{post.postDetail.requisites}</p>
          </div>
          <p className="title">Mapa</p>
          <div className="mapContainer">
            <Map items={[post]} zoom={15} />
          </div>
          <button className="share-btn">
            Compartir publicación
            <img src="/share.png" alt="share" />
          </button>
        </div>
      </div>
    </div>
  );
}

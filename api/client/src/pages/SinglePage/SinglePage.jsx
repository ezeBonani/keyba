//import { useParams } from "react-router-dom";
import Slider from "../../components/slider/Slider";
import "./singlePage.scss";
import Map from "../../components/map/Map";
import ContactForm from "../../components/contactForm/ContactForm";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import GoogleMaps from "../../components/googleMaps/GoogleMaps";

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
              <p className="title">Mapa</p>
              <div className="mapContainer">
                <Map items={[post]} zoom={15} />
                {/*  <GoogleMaps items={[post]} zoom={16} /> */}
              </div>
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

          <p className="title">Servicios</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/servicios/tipo.png" alt="tipo" />
              <p className="type">Tipo: {post.type || ""}</p>
            </div>

            <div className="feature">
              <img src="/servicios/pet.png" alt="pet" />
              <p className="petPolicy">
                Admite mascotas: {post.postDetail.pet || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/pool.png" alt="pool" />
              <p className="pool">Piscina: {post.postDetail.pool || ""}</p>
            </div>

            <div className="feature">
              <img src="/servicios/agua-caliente.png" alt="agua-caliente" />
              <p className="hotWater">
                Agua Caliente: {post.postDetail.hotWater || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/aire-acondicionado.png" alt="a-c" />
              <p className="airConditioner">
                Aire acondicionado: {post.postDetail.airConditioner || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/almohada.png" alt="almohada" />
              <p className="extraPillows">
                Almohadas y mantas adicionales:{" "}
                {post.postDetail.extraPillows || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/bandeja-horno.png" alt="bandeja" />
              <p className="ovenPlate">
                Bandeja para horno: {post.postDetail.ovenPlate || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/bathtub.png" alt="bañera" />
              <p className="bathtub">Bañera: {post.postDetail.bathtub || ""}</p>
            </div>

            <div className="feature">
              <img src="/servicios/bide.png" alt="bidet" />
              <p className="bidet">Bidet: {post.postDetail.bidet || ""}</p>
            </div>

            <div className="feature">
              <img src="/servicios/cafetera.png" alt="cafetera" />
              <p className="coffeeMaker">
                Cafetera: {post.postDetail.coffeeMaker || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/cafe.png" alt="cafe" />
              <p className="coffee">Café: {post.postDetail.coffee || ""}</p>
            </div>

            <div className="feature">
              <img src="/servicios/caja-fuerte.png" alt="caja-fuerte" />
              <p className="safe">Caja fuerte: {post.postDetail.safe || ""}</p>
            </div>

            <div className="feature">
              <img src="/servicios/calefaccion.png" alt="calefaccion" />
              <p className="heating">
                Calefacción: {post.postDetail.heating || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/cocina.png" alt="cocina" />
              <p className="kitchen">Cocina: {post.postDetail.kitchen || ""}</p>
            </div>

            <div className="feature">
              <img src="/servicios/ethernet.png" alt="ethernet" />
              <p className="ethernet">
                Conexión Ethernet: {post.postDetail.ethernet || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/freezer.png" alt="freezer" />
              <p className="freezer">
                Freezer: {post.postDetail.freezer || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/copas.png" alt="copa" />
              <p className="glassWine">
                Copas de vino: {post.postDetail.glassWine || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/ducha-exterior.png" alt="ducha-exterior" />
              <p className="exteriorShower">
                Ducha en exterior: {post.postDetail.exteriorShower || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/placard.png" alt="placard" />
              <p className="clothingStorage">
                Espacio de guardado de ropa:{" "}
                {post.postDetail.clothingStorage || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/parking.png" alt="estacionamiento" />
              <p className="parking">
                Estacionamiento propio: {post.postDetail.parking || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/frigobar.png" alt="frigobar" />
              <p className="frigobar">
                Frigobar: {post.postDetail.frigobar || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/gel-ducha.png" alt="gel-ducha" />
              <p className="showerGel">
                Gel de ducha: {post.postDetail.showerGel || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/heladera.png" alt="heladera" />
              <p className="refrigerator">
                Heladera: {post.postDetail.refrigerator || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/horno.png" alt="horno" />
              <p className="oven">Horno: {post.postDetail.oven || ""}</p>
            </div>

            <div className="feature">
              <img src="/servicios/laundry.png" alt="laundry" />
              <p className="nearLaundry">
                Servicio de laundry cercano: {post.postDetail.nearLaundry || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/lavarropas.png" alt="lavarropas" />
              <p className="washingMachine">
                Lavarropas: {post.postDetail.washingMachine || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/mesa-comedor.png" alt="mesa" />
              <p className="diningTable">
                Mesa de comedor: {post.postDetail.diningTable || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/microondas.png" alt="microondas" />
              <p className="microwave">
                Microondas: {post.postDetail.microwave || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/patio.png" alt="patio" />
              <p className="yard">Patio: {post.postDetail.yard || ""}</p>
            </div>

            <div className="feature">
              <img src="/servicios/balcon.png" alt="balcon" />
              <p className="balcony">Balcón: {post.postDetail.balcony || ""}</p>
            </div>

            <div className="feature">
              <img src="/servicios/pava-electrica.png" alt="pava-electrica" />
              <p className="electricKettle">
                Pava eléctrica: {post.postDetail.electricKettle || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/perchas.png" alt="percha" />
              <p className="hangers">
                Perchas: {post.postDetail.hangers || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/plancha.png" alt="plancha" />
              <p className="iron">Plancha: {post.postDetail.iron || ""}</p>
            </div>

            <div className="feature">
              <img src="/servicios/productos-de-limpieza.png" alt="limpieza" />
              <p className="cleanningProducts">
                Productos de limpieza: {post.postDetail.cleaningProducts || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/ropa-de-cama.png" alt="ropa-de-cama" />
              <p className="linens">
                Ropa de cama: {post.postDetail.linens || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/equipaje.png" alt="equipaje" />
              <p className="dropLuggage">
                Se permite dejar el equipaje: {post.postDetail.hotWater || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/arrival.png" alt="arrival" />
              <p className="earlyArrivalLateDeparture">
                Opción de llegar temprano o salir tarde:{" "}
                {post.postDetail.earlyArrivalLateDeparture || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/jabon.png" alt="amenities" />
              <p className="soapToiletPaper">
                Amenities de baño: {post.postDetail.soapToiletPaper || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/gel-ducha.png" alt="shampoo" />
              <p className="shampoo">
                Shampoo: {post.postDetail.shampoo || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/sillas.png" alt="sillas" />
              <p className="diningChair">
                Sillas en comedor: {post.postDetail.diningChair || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/tv.png" alt="tv" />
              <p className="tv">Televisor: {post.postDetail.tv || ""}</p>
            </div>

            <div className="feature">
              <img src="/servicios/tostadora.png" alt="tostadora" />
              <p className="toaster">
                Tostadora: {post.postDetail.toaster || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/tender.png" alt="tender" />
              <p className="tender">
                Tender para ropa: {post.postDetail.tender || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/sarten.png" alt="sartenes" />
              <p className="pansPots">
                Ollas y sartenes: {post.postDetail.pansPots || ""}
              </p>
            </div>

            <div className="feature">
              <img
                src="/servicios/cubiertos-platos.png"
                alt="platos-cubiertos"
              />
              <p className="cutleryPlates">
                Platos y cubiertos: {post.postDetail.cutleryPlates || ""}
              </p>
            </div>

            <div className="feature">
              <img src="/servicios/wifi.png" alt="wifi" />
              <p className="wifi">Wifi: {post.postDetail.wifi || ""}</p>
            </div>

            <div className="feature">
              <img src="/servicios/zona-trabajo.png" alt="zona-trabajo" />
              <p className="workSpace">
                Espacio de trabajo: {post.postDetail.workSpace || ""}
              </p>
            </div>
          </div>

          <p className="title">Dimensiones</p>
          <div className="sizes">
            <div className="size">
              <img src="/puerta.png" alt="rooms" className="icon" />
              <span>{post.rooms} amb</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="bath" className="icon" />
              <span>{post.bathroom} baño/s</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="bed" className="icon" />
              <span>{post.beds} cama/s</span>
            </div>
            <div className="size">
              <img src="/m2.png" alt="size" className="icon" />
              <span>{post.size} m2</span>
            </div>
          </div>
          <p className="title">Requisitos de alquiler</p>
          <div className="listVertical">
            <p className="requisites">{post.postDetail.requisites}</p>
          </div>
          <a
            href={`whatsapp://send?text=${window.location}`}
            data-action="share/whatsapp/share"
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn"
          >
            <img src="/share.png" alt="share" className="icon" />{" "}
            <span>Compartir publicación</span>
          </a>
        </div>
      </div>
    </div>
  );
}

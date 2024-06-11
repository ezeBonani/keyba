import { useState } from "react";
import "./newPost.scss";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import { Link, useNavigate } from "react-router-dom";

export default function NewPost() {
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      setError("Debés subir por lo menos una imágen!");
      return;
    }
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          address: inputs.address,
          city: inputs.city,
          price: parseInt(inputs.price),
          expenses: parseInt(inputs.expenses),
          rooms: parseInt(inputs.rooms),
          bathroom: parseInt(inputs.bathroom),
          beds: parseInt(inputs.beds),
          size: parseInt(inputs.size),
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          type: inputs.type,
          images: images,
        },
        postDetail: {
          description: inputs.description,
          pet: inputs.pet,
          pool: inputs.pool,
          requisites: inputs.requisites,
          hotWater: inputs.hotWater,
          airConditioner: inputs.airConditioner,
          extraPillows: inputs.extraPillows,
          ovenPlate: inputs.ovenPlate,
          bathtub: inputs.bathtub,
          bidet: inputs.bidet,
          coffeeMaker: inputs.coffeeMaker,
          coffee: inputs.coffee,
          safe: inputs.safe,
          heating: inputs.heating,
          kitchen: inputs.kitchen,
          ethernet: inputs.ethernet,
          freezer: inputs.freezer,
          glassWine: inputs.glassWine,
          exteriorShower: inputs.exteriorShower,
          clothingStorage: inputs.clothingStorage,
          parking: inputs.parking,
          frigobar: inputs.frigobar,
          showerGel: inputs.showerGel,
          refrigerator: inputs.refrigerator,
          oven: inputs.oven,
          nearLaundry: inputs.nearLaundry,
          washingMachine: inputs.washingMachine,
          diningTable: inputs.diningTable,
          microwave: inputs.microwave,
          yard: inputs.yard,
          balcony: inputs.balcony,
          electricKettle: inputs.electricKettle,
          hangers: inputs.hangers,
          iron: inputs.iron,
          cleaningProducts: inputs.cleaningProducts,
          linens: inputs.linens,
          dropLuggage: inputs.dropLuggage,
          earlyArrivalLateDeparture: inputs.earlyArrivalLateDeparture,
          soapToiletPaper: inputs.soapToiletPaper,
          shampoo: inputs.shampoo,
          diningChair: inputs.diningChair,
          tv: inputs.tv,
          toaster: inputs.toaster,
          tender: inputs.tender,
          pansPots: inputs.pansPots,
          cutleryPlates: inputs.cutleryPlates,
          wifi: inputs.wifi,
          workSpace: inputs.workSpace,
        },
      });
      navigate("/" + res.data.id);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div className="newPost">
      <div className="formContainer">
        <h1>Crear Nueva Publicación</h1>
        <UploadWidget
          uwConfig={{
            cloudName: import.meta.env.VITE_CLOUDINARY_CLOUDNAME,
            uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
            multiple: true,
            maxImageFileSize: 2000000,
            folder: "posts",
            sources: ["local", "url", "google_drive"],
          }}
          setState={setImages}
        />
        <div className="images">
          {images.map((image, index) => {
            return <img src={image} key={index} alt={index} />;
          })}
        </div>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item large">
              <label htmlFor="title">Título</label>
              <input type="text" id="title" name="title" required />
            </div>

            <div className="item large">
              <label htmlFor="address">Dirección</label>
              <input type="text" id="address" name="address" required />
            </div>

            <div className="item">
              <label htmlFor="price">Precio</label>
              <input type="number" id="price" name="price" min={0} required />
            </div>

            <div className="item">
              <label htmlFor="expenses">Expensas</label>
              <input
                type="number"
                id="expenses"
                name="expenses"
                min={0}
                required
              />
            </div>

            <div className="item">
              <label htmlFor="city">Ciudad/Barrio</label>
              <input id="city" name="city" type="text" required />
            </div>

            <div className="item">
              <label htmlFor="size">Superficie</label>
              <input
                min={10}
                id="size"
                name="size"
                type="number"
                placeholder="m2"
                required
              />
            </div>

            <div className="item">
              <label htmlFor="rooms">Ambientes</label>
              <input
                min={1}
                id="rooms"
                name="rooms"
                type="number"
                placeholder="cantidad"
                required
              />
            </div>

            <div className="item">
              <label htmlFor="beds">Camas</label>
              <input
                min={1}
                id="beds"
                name="beds"
                type="number"
                placeholder="cantidad"
                required
              />
            </div>

            <div className="item">
              <label htmlFor="latitude">Latitud</label>
              <input
                id="latitude"
                name="latitude"
                type="text"
                required
                placeholder="-34.603708"
              />
            </div>

            <div className="item">
              <label htmlFor="longitude">Longitud</label>
              <input
                id="longitude"
                name="longitude"
                type="text"
                required
                placeholder="-58.381288"
              />
            </div>

            <div className="item">
              <label htmlFor="bathroom">Baños</label>
              <input
                min={1}
                id="bathroom"
                name="bathroom"
                type="number"
                placeholder="cantidad"
                required
              />
            </div>

            <div className="item large">
              <label htmlFor="requisites">Requisitos Inmobiliarios</label>
              <input type="text" id="requisites" name="requisites" required />
            </div>

            <div className="item description">
              <label htmlFor="description">Descripción</label>
              <textarea name="description" id="description" required></textarea>
            </div>

            <div className="item">
              <label htmlFor="type">Tipo</label>
              <select name="type">
                <option value="depto">depto</option>
                <option value="casa">casa</option>
                <option value="ph">ph</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="pet">Mascotas</label>
              <select name="pet">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="pool">Piscina</label>
              <select name="pool">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="hotWater">Agua Caliente</label>
              <select name="hotWater">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="airConditioner">Aire Acondicionado</label>
              <select name="airConditioner">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="extraPillows">Sábanas y almohadas extras</label>
              <select name="extraPillows">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="ovenPlate">Bandeja de horno</label>
              <select name="ovenPlate">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="bathtub">Bañera</label>
              <select name="bathtub">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="bidet">Bidet</label>
              <select name="bidet">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="coffeeMaker">Cafetera</label>
              <select name="coffeeMaker">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="coffee">Café</label>
              <select name="coffee">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="safe">Caja Fuerte</label>
              <select name="safe">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="heating">Calefacción</label>
              <select name="heating">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="kitchen">Cocina</label>
              <select name="kitchen">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="ethernet">Conexión Ethernet</label>
              <select name="ethernet">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="freezer">Freezer</label>
              <select name="freezer">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="glassWine">Copas de vino</label>
              <select name="glassWine">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="exteriorShower">Ducha de Exterior</label>
              <select name="exteriorShower">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="clothingStorage">
                Espacio de guardado de ropa
              </label>
              <select name="clothingStorage">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="parking">Estacionamiento propio</label>
              <select name="parking">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="frigobar">Frigobar</label>
              <select name="frigobar">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="showerGel">Gel de ducha</label>
              <select name="showerGel">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="refrigerator">Heladera</label>
              <select name="refrigerator">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="oven">Horno</label>
              <select name="oven">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="nearLaundry">Servicio de laundry cercano</label>
              <select name="nearLaundry">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="washingMachine">Lavarropas</label>
              <select name="washingMachine">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="diningTable">Mesa de comedor</label>
              <select name="diningTable">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="microwave">Microondas</label>
              <select name="microwave">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="yard">Patio</label>
              <select name="yard">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="balcony">Balcón</label>
              <select name="balcony">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="electricKettle">Pava eléctrica</label>
              <select name="electricKettle">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="hangers">Perchas</label>
              <select name="hangers">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="iron">Plancha</label>
              <select name="iron">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="cleaningProducts">Productos de limpieza</label>
              <select name="cleaningProducts">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="linens">Ropa de cama</label>
              <select name="linens">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="dropLuggage">Se permite dejar el equipaje</label>
              <select name="dropLuggage">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="earlyArrivalLateDeparture">
                Opción de llegar temprano o salir tarde
              </label>
              <select name="earlyArrivalLateDeparture">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="soapToiletPaper">Amenities de baño</label>
              <select name="soapToiletPaper">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="shampoo">Shampoo</label>
              <select name="shampoo">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="diningChair">Sillas en comedor</label>
              <select name="diningChair">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="tv">Televisión</label>
              <select name="tv">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="toaster">Tostadora</label>
              <select name="toaster">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="tender">Tender para ropa</label>
              <select name="tender">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="panPots">Ollas y sartenes</label>
              <select name="panPots">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="cutleryPlates">Platos y cubiertos</label>
              <select name="cutleryPlates">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="wifi">Wifi</label>
              <select name="wifi">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="workSpace">Zona de trabajo</label>
              <select name="workSpace">
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <button className="sendButton">Crear publicación</button>
          </form>
          {error && <p className="error">{error}</p>}
          <Link to={"/profile"} className="backLink">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}

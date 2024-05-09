import { useLoaderData, useNavigate } from "react-router-dom";
import "./updatePost.scss";
import { useState } from "react";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import apiRequest from "../../lib/apiRequest";

export default function UpdatePost() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const post = useLoaderData();
  console.log(post);

  const [images, setImages] = useState(post.images);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/posts/${post.id}`, {
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
          laundry: inputs.laundry,
          requisites: inputs.requisites,
        },
      });
      navigate("/" + res.data.id);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div className="updatePost">
      <div className="formContainer">
        <h1>Actualizar Publicación</h1>
        <UploadWidget
          uwConfig={{
            cloudName: "ezebonani",
            uploadPreset: "keyba_test",
            multiple: true,
            maxImageFileSize: 2000000,
            folder: "posts",
            sources: ["local", "url", "google_drive"],
          }}
          setState={setImages}
        />
        <p>
          <i>(Si actualizás imágenes debes volver a cargarlas todas)</i>
        </p>
        <div className="images">
          {images.map((image, index) => {
            return <img src={image} key={index} alt={index} />;
          })}
        </div>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item large">
              <label htmlFor="title">Título</label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={post.title}
              />
            </div>

            <div className="item large">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                id="address"
                name="address"
                defaultValue={post.address}
              />
            </div>

            <div className="item">
              <label htmlFor="price">Precio</label>
              <input
                type="number"
                id="price"
                name="price"
                min={0}
                defaultValue={post.price}
              />
            </div>

            <div className="item">
              <label htmlFor="expenses">Expensas</label>
              <input
                type="number"
                id="expenses"
                name="expenses"
                min={0}
                defaultValue={post.expenses}
              />
            </div>

            <div className="item">
              <label htmlFor="city">Ciudad/Barrio</label>
              <input
                id="city"
                name="city"
                type="text"
                defaultValue={post.city}
              />
            </div>

            <div className="item">
              <label htmlFor="size">Superficie</label>
              <input
                min={10}
                id="size"
                name="size"
                type="number"
                placeholder="m2"
                defaultValue={post.size}
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
                defaultValue={post.rooms}
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
                defaultValue={post.beds}
              />
            </div>

            <div className="item">
              <label htmlFor="latitude">Latitud</label>
              <input
                id="latitude"
                name="latitude"
                type="text"
                defaultValue={post.latitude}
              />
            </div>

            <div className="item">
              <label htmlFor="longitude">Longitud</label>
              <input
                id="longitude"
                name="longitude"
                type="text"
                defaultValue={post.longitude}
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
                defaultValue={post.bathroom}
              />
            </div>

            <div className="item large">
              <label htmlFor="requisites">Requisitos Inmobiliarios</label>
              <input
                type="text"
                id="requisites"
                name="requisites"
                defaultValue={post.postDetail.requisites}
              />
            </div>

            <div className="item description">
              <label htmlFor="description">Descripción</label>
              <textarea
                name="description"
                id="description"
                defaultValue={post.postDetail.description}
              ></textarea>
            </div>

            <div className="item">
              <label htmlFor="type">Tipo</label>
              <select name="type" defaultValue={post.postDetail.type}>
                <option value="depto">Depto</option>
                <option value="casa">Casa</option>
                <option value="ph">PH</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="pet">Mascotas</label>
              <select name="pet" defaultValue={post.postDetail.pet}>
                <option value="Permitido">Si</option>
                <option value="No Permitido">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="pool">Piscina</label>
              <select name="pool" defaultValue={post.postDetail.pool}>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="laundry">Laundry</label>
              <select name="laundry" defaultValue={post.postDetail.laundry}>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>

            <button className="sendButton">Actualizar publicación</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
    </div>
  );
}

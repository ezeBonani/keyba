/* eslint-disable react/prop-types */
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import "./contactForm.scss";

export default function ContactForm({ postTitle }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    try {
      const res = await apiRequest.post("/mail", {
        name: inputs.name,
        phone: inputs.phone,
        email: inputs.email,
        message: inputs.message,
        post: postTitle,
      });
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="contactForm">
      <form onSubmit={handleSubmit}>
        <div className="top">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nombre"
            required
          />
          <input
            type="number"
            id="phone"
            name="phone"
            placeholder="Teléfono (sólo números)"
            required
          />
        </div>
        <div className="bottom">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="message">
          <textarea
            name="message"
            id="message"
            placeholder="Escribí tu consulta"
            defaultValue="Hola, vi esta propiedad en KEYBA y quiero que me contacten. Gracias!"
            required
          ></textarea>
        </div>
        <button disabled={loading}>{loading ? "Enviando..." : "Enviar"}</button>
      </form>
      {success && <p className="success">Mensaje enviado exitosamente!</p>}
      {error && <p className="error">No se ha podido enviar el mensaje!</p>}
    </div>
  );
}

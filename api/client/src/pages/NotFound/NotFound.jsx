import { Link } from "react-router-dom";
import "./notFound.scss";

export default function NotFound() {
  return (
    <div className="notFound">
      <h1>Not Found!</h1>
      <h2>La página que estás buscando no se encuentra</h2>
      <p>
        A no desesperar, esto nos ha sucedido a todos dando vueltas por
        internet...
      </p>
      <p>Podés volver y continuar buscando!</p>
      <Link to="/">Volver al Home</Link>
    </div>
  );
}

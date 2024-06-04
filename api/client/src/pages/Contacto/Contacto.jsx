import "./contacto.scss";

export default function Contacto() {
  return (
    <div className="contacto">
      <div className="wrapper">
        <div className="imagen">
          <img src="/contacto.webp" alt="contacto" />
        </div>
        <div className="infoContacto">
          <h1>Para nosotros, brindar una buena comunicación es primordial</h1>
          <p>
            Podés contactarnos a través de los formularios en cada publicación o
            también por los siguientes canales:
          </p>
          <ul>
            <li>
              <img src="/email.png" alt="email" />
              <span>
                email: <b>xxx@gmail.com</b>
              </span>
            </li>
            <li>
              <img src="/phone.png" alt="phone" />
              <span>
                teléfono: <b>+54 11 xxx</b>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

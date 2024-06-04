import "./sobreNosotros.scss";

export default function SobreNosotros() {
  return (
    <div className="sobreNosotros">
      <div className="wrapper">
        <div className="imagen">
          <img src="/workgroup.webp" alt="workgroup" />
        </div>
        <div className="infoSobreNosotros">
          <div className="title">
            <h1>KEYBA</h1>
            <h2>Equipo de Anfitriones</h2>
          </div>
          <p>
            Somos un grupo de amigos que nos dimos cuenta que nos queríamos
            ofrecer un servicio de hospedaje único. Sabemos lo importante que es
            gestionar una propiedad, tanto para los inquilinos como para los
            propietarios.
          </p>
          <p>
            Somos anfitriones, y como tales nuestra misión es brindar un
            servicio de hospedaje integral basado en los siguientes principios:
          </p>
          <ul>
            <li>
              <img src="/confianza.png" alt="valores" />
              <span>
                <b>Confianza</b>
              </span>
            </li>
            <li>
              <img src="/honestidad.png" alt="valores" />
              <span>
                <b>Honestidad</b>
              </span>
            </li>
            <li>
              <img src="/responsabilidad.png" alt="valores" />
              <span>
                <b>Responsabilidad</b>
              </span>
            </li>
            <li>
              <img src="/calidad.png" alt="valores" />
              <span>
                <b>Calidad de servicio</b>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

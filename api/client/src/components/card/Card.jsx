/* eslint-disable react/prop-types */
import "./card.scss";
import { Link } from "react-router-dom";

export default function Card({ item }) {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt={item.title} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <div className="address">
          <div className="street">
            <img src="/pin.png" alt="pin" />
            <span>{item.address}</span>
          </div>
          <div className="city">{item.city}</div>
        </div>
        <div className="price">
          $ {item.price}
          <div className="expenses">Expensas: ${item.expenses}</div>
        </div>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/puerta.png" alt="door" />
              <span>{item.rooms} amb</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="bath" />
              <span>{item.bathroom} baño/s</span>
            </div>
            <div className="feature">
              <img src="/bed.png" alt="beds" />
              <span>{item.beds} cama/s</span>
            </div>
            <div className="feature">
              <img src="/m2.png" alt="m2" />
              <span>{item.size} m2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

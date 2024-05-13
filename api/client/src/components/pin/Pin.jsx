/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./pin.scss";
import { Marker, Popup } from "react-leaflet";

export default function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images[0]} alt="item-img" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <b>${item.price}</b>
            <p>
              {item.rooms} amb - {item.size} m2
            </p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

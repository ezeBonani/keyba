/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./pin.scss";
import { Marker, Popup, Circle } from "react-leaflet";
import { icon } from "leaflet";

const ICON = icon({
  iconUrl: "/gps-mark.png",
  iconSize: [36, 36],
});

export default function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]} icon={ICON}>
      <Circle center={[item.latitude, item.longitude]} radius={100} />
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

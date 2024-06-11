// LEATLET MAP (no esta en uso actualmente)
/* eslint-disable react/prop-types */
import "./map.scss";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

export default function Map({ items, zoom }) {
  return (
    <>
      <MapContainer
        center={
          items.length > 0
            ? [items[0].latitude, items[0].longitude]
            : ["-34.606", "-58.48"]
        }
        zoom={zoom}
        scrollWheelZoom={true}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {items.map((item) => {
          return <Pin item={item} key={item.id} />;
        })}
      </MapContainer>
    </>
  );
}

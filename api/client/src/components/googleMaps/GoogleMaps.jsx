/* eslint-disable react/prop-types */
import { memo, useState } from "react";
import "./googleMaps.scss";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
  Circle,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";

const GoogleMaps = memo(function GoogleMaps({ items, zoom }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [center, setCenter] = useState({
    lat: parseFloat(items[0].latitude),
    lng: parseFloat(items[0].longitude),
  });
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (markerId) => {
    if (markerId === activeMarker) {
      return;
    }
    setActiveMarker(markerId);
  };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          center={center || { lat: -34.603802, lng: -58.38155 }}
          zoom={zoom}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
          }}
          onClick={() => setActiveMarker(null)}
        >
          {/* markers */}
          {items.map((item) => {
            return (
              <MarkerF
                key={item.id}
                position={{
                  lat: parseFloat(item.latitude),
                  lng: parseFloat(item.longitude),
                }}
                onClick={() =>
                  handleActiveMarker(
                    item.id,
                    parseFloat(item.latitude),
                    parseFloat(item.longitude)
                  )
                }
              >
                <Circle
                  center={{
                    lat: parseFloat(item.latitude),
                    lng: parseFloat(item.longitude),
                  }}
                  radius={120}
                  options={{
                    strokeColor: "#43E5E3",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#43E5E3",
                    fillOpacity: 0.35,
                  }}
                />
                {activeMarker === item.id ? (
                  <InfoWindowF
                    onCloseClick={() => setActiveMarker(null)}
                    width={"300px"}
                  >
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
                  </InfoWindowF>
                ) : null}
              </MarkerF>
            );
          })}
        </GoogleMap>
      ) : null}
    </>
  );
});

export default GoogleMaps;

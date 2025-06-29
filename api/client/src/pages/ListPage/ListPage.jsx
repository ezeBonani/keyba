import "./listPage.scss";
//import { listData } from "../../lib/dummyData";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { useLoaderData } from "react-router-dom";
import GoogleMaps from "../../components/googleMaps/GoogleMaps";

export default function ListPage() {
  const data = useLoaderData();

  return (
    <div className="list-page">
      <div className="list-container">
        <div className="wrapper">
          <Filter data={data} />
          {data.length > 0 ? (
            data.map((item) => <Card key={item.id} item={item} />)
          ) : (
            <p>
              No se encuentran resultados... probá cambiando los parámetros de
              búsqueda
            </p>
          )}
        </div>
      </div>
      <div className="map-container">
        <Map items={data} zoom={12} />
        {/* <GoogleMaps items={data} zoom={12} /> */}
      </div>
    </div>
  );
}

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./filter.scss";
import Select from "react-select";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Filter({ data }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCities, setSelectedCities] = useState(
    searchParams.get("cities") ? searchParams.get("cities").split("-") : []
  );
  const navigate = useNavigate();

  //armo un vector de objetos para pasarselo al componente Select con las ciudades disponibles
  const cities = [
    ...new Set(
      data.map((item) => {
        return item.city;
      })
    ),
  ]
    .sort()
    .map((item) => {
      return { value: item, label: item };
    });

  let searchedCities = [];
  if (searchParams.get("cities")) {
    if (searchParams.get("cities").length > 0) {
      searchedCities = searchParams
        .get("cities")
        .split("-")
        .map((item) => {
          return { value: item, label: item };
        });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    navigate(
      `/list?search=${inputs.search}&minPrice=${inputs.minPrice}&maxPrice=${
        inputs.maxPrice
      }&type=${inputs.type}&rooms=${inputs.rooms}&cities=${selectedCities.join(
        "-"
      )}`
    );
  };

  return (
    <div className="filter">
      <h2>Resultados de búsqueda</h2>
      <form onSubmit={handleSubmit}>
        <div className="top">
          <div className="item">
            <label htmlFor="search">Descripción: </label>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Descripción / Ubicación"
              defaultValue={searchParams.get("search")}
            />

            <div className="item">
              <label htmlFor="">Barrio/Ciudad:</label>
              <Select
                className="citySelector"
                classNamePrefix="select"
                placeholder="Elegir"
                options={cities}
                closeMenuOnSelect={false}
                isMulti
                onChange={(choices) => {
                  setSelectedCities(choices.map((choice) => choice.value));
                }}
                defaultValue={searchedCities}
              />
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="item">
            <label htmlFor="type">Tipo</label>
            <select
              name="type"
              id="type"
              defaultValue={searchParams.get("type")}
            >
              <option value="">Todos</option>
              <option value="depto">Depto</option>
              <option value="ph">PH</option>
              <option value="casa">Casa</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="minPrice">Precio Mín</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              min={0}
              max={1000000}
              placeholder="mín"
              defaultValue={searchParams.get("minPrice")}
            />
          </div>
          <div className="item">
            <label htmlFor="maxPrice">Precio Máx</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              min={0}
              max={5000000}
              placeholder="máx"
              defaultValue={searchParams.get("maxPrice")}
            />
          </div>
          <div className="item">
            <label htmlFor="rooms">Ambientes</label>
            <input
              type="number"
              id="rooms"
              name="rooms"
              min={1}
              max={6}
              placeholder="Cantidad"
              defaultValue={searchParams.get("rooms")}
            />
          </div>
          <button>
            <img src="/search.png" alt="search-icon" />
          </button>
        </div>
      </form>
    </div>
  );
}

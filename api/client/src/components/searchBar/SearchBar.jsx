import { useNavigate } from "react-router-dom";
import "./searchBar.scss";

export default function SearchBar() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { search, minPrice, maxPrice } = Object.fromEntries(formData);
    navigate(
      `/list?search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  };

  return (
    <div className="searchBar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Descripción / Ciudad / Barrio / Dirección"
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={1000000}
          placeholder="Precio Mín"
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Precio Máx"
        />
        <button>
          <img src="/search.png" alt="search-icon" />
        </button>
      </form>
    </div>
  );
}

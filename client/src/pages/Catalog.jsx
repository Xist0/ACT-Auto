import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCars } from "../api/cars";
import "../styles/catalog.scss";

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;
  const [filters, setFilters] = useState({ brand: "", model: "", year: "", color: "" });

  useEffect(() => {
    getCars().then((data) => {
      setCars(data);
      setFilteredCars(data);
    });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let filtered = cars.filter((car) =>
      Object.keys(filters).every(
        (key) => !filters[key] || car[key].toString().toLowerCase().includes(filters[key].toLowerCase())
      )
    );
    setFilteredCars(filtered);
    setCurrentPage(1);
  }, [filters, cars]);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <div className="catalog">
      <div className="filters">
        <input name="brand" placeholder="Марка" onChange={handleFilterChange} />
        <input name="model" placeholder="Модель" onChange={handleFilterChange} />
        <input name="year" placeholder="Год" type="number" onChange={handleFilterChange} />
        <input name="color" placeholder="Цвет" onChange={handleFilterChange} />
      </div>
      <div className="cars-grid">
        {currentCars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`} className="car-card">
            <img src={car.picture[0]} alt={car.name} />
            <h3>{car.name}</h3>
            <p className="price">{car.price.toLocaleString()} ₽</p>
          </Link>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredCars.length / carsPerPage) }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Catalog;

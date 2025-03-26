import React, { useEffect, useState } from "react";
import { Input, Select, Row, Col, Spin, Button } from "antd";
import { getCars } from "../api/cars";
import CarCard from "../components/CarCard";
import "../styles/catalog.scss";

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 12;
  const [maxCardHeight, setMaxCardHeight] = useState(0);
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    drive: "",
    transmission: "",
    owners: ""
  });

  useEffect(() => {
    getCars().then((data) => {
      setCars(data);
      setFilteredCars(data);
      setLoading(false);
    });
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let filtered = cars.filter(car =>
      Object.keys(filters).every(key =>
        !filters[key] || car.param.find(p => p.name === key)?._.toLowerCase().includes(filters[key].toLowerCase())
      )
    );
    setFilteredCars(filtered);
    setCurrentPage(1);
  }, [filters, cars]);

  const displayedCars = filteredCars.slice(0, currentPage * carsPerPage);

  return (
    <div className="catalog">
      <div className="filters">
        <Select placeholder="Марка" onChange={(value) => handleFilterChange("brand", value)}>
          {[...new Set(cars.map(car => car.vendor))].map(brand => (
            <Select.Option key={brand} value={brand}>{brand}</Select.Option>
          ))}
        </Select>
      </div>

      {loading ? <Spin size="large" className="loading" /> : (
        <>
          <Row gutter={[16, 16]}>
            {displayedCars.map(car => (
              <Col key={car.id} xs={24} sm={12} md={8} lg={6}>
                <CarCard car={car} setMaxHeight={setMaxCardHeight} />
              </Col>
            ))}
          </Row>
          {displayedCars.length < filteredCars.length && (
            <Button className="load-more" onClick={() => setCurrentPage(prev => prev + 1)}>Загрузить ещё</Button>
          )}
        </>
      )}
    </div>
  );
};

export default Catalog;

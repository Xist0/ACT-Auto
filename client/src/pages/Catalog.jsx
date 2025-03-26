import React, { useState, useEffect } from "react";
import { Select, Input, Row, Col, Button, Slider, Space, Switch, Checkbox } from "antd";
import { getCars } from "../api/cars"; // Получаем автомобили из API
import "../styles/catalog.scss";
import CarCard from "../components/CarCard";

const { Option } = Select;

const FilterBlock = ({ filters, onFilterChange, onSortChange, sortOrder }) => {
  const [allCars, setAllCars] = useState([]);
  
  useEffect(() => {
    // Загружаем данные автомобилей
    getCars().then((data) => {
      setAllCars(data);
    });
  }, []);
  
  // Получаем уникальные значения для фильтрации
  const uniqueBrands = [...new Set(allCars.map((car) => car.vendor))];
  const uniqueModels = [...new Set(allCars.map((car) => car.model))];
  const uniqueYears = [...new Set(allCars.map((car) => car.param.find((p) => p.name === "Год выпуска")?._))];
  const uniqueColors = [...new Set(allCars.map((car) => car.param.find((p) => p.name === "Цвет")?._))];
  const uniqueTransmissions = [...new Set(allCars.map((car) => car.param.find((p) => p.name === "КПП")?._))];
  const uniqueDrives = [...new Set(allCars.map((car) => car.param.find((p) => p.name === "Привод")?._))];
  const uniquePrices = allCars.map((car) => car.price);
  const maxPrice = Math.max(...uniquePrices);
  const minPrice = Math.min(...uniquePrices);

  return (
    <div className="filters">
      <Row gutter={[16, 16]} className="filter-group">
        <Col xs={24} sm={12} md={8}>
          <Select
            placeholder="Марка"
            onChange={(value) => onFilterChange("brand", value)}
            value={filters.brand}
            allowClear
          >
            {uniqueBrands.map((brand) => (
              <Option key={brand} value={brand}>
                {brand}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Select
            placeholder="Модель"
            onChange={(value) => onFilterChange("model", value)}
            value={filters.model}
            allowClear
          >
            {uniqueModels.map((model) => (
              <Option key={model} value={model}>
                {model}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Select
            placeholder="Год выпуска"
            onChange={(value) => onFilterChange("year", value)}
            value={filters.year}
            allowClear
          >
            {uniqueYears.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Select
            placeholder="Тип коробки"
            onChange={(value) => onFilterChange("transmission", value)}
            value={filters.transmission}
            allowClear
          >
            {uniqueTransmissions.map((transmission) => (
              <Option key={transmission} value={transmission}>
                {transmission}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Select
            placeholder="Цвет"
            onChange={(value) => onFilterChange("color", value)}
            value={filters.color}
            allowClear
          >
            {uniqueColors.map((color) => (
              <Option key={color} value={color}>
                {color}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Select
            placeholder="Тип привода"
            onChange={(value) => onFilterChange("drive", value)}
            value={filters.drive}
            allowClear
          >
            {uniqueDrives.map((drive) => (
              <Option key={drive} value={drive}>
                {drive}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <div className="price-slider-container">
            <div className="price-range-labels">
              <span>₽{minPrice}</span>
              <span>₽{maxPrice}</span>
            </div>
            <Slider
              range
              min={0}
              max={maxPrice}
              step={10000}
              defaultValue={[0, maxPrice]}
              onChange={(value) => onFilterChange("price", value)}
              value={filters.price}
              tooltip={{ formatter: (value) => `₽${value}` }}
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Button
            onClick={() => onSortChange(sortOrder === "asc" ? "desc" : "asc")}
            type={sortOrder === "asc" ? "primary" : "default"}
            style={{ width: "100%" }}
          >
            {sortOrder === "asc" ? "Сортировать по убыванию" : "Сортировать по возрастанию"}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    year: "",
    transmission: "",
    color: "",
    price: [0, 1000000],
    drive: "",
  });
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    getCars().then((data) => {
      setCars(data);
      setFilteredCars(data);
    });
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sortedCars = [...filteredCars].sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setFilteredCars(sortedCars);
  };

  useEffect(() => {
    const filtered = cars.filter((car) => {
      return (
        (filters.brand ? car.vendor === filters.brand : true) &&
        (filters.model ? car.model === filters.model : true) &&
        (filters.year ? car.param.find((p) => p.name === "Год выпуска")?._ === filters.year : true) &&
        (filters.transmission ? car.param.find((p) => p.name === "КПП")?._ === filters.transmission : true) &&
        (filters.color ? car.param.find((p) => p.name === "Цвет")?._ === filters.color : true) &&
        (filters.drive ? car.param.find((p) => p.name === "Привод")?._ === filters.drive : true) &&
        (car.price >= filters.price[0] && car.price <= filters.price[1])
      );
    });
    setFilteredCars(filtered);
  }, [filters, cars]);

  return (
    <div className="catalog">
      <FilterBlock
        filters={filters}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        sortOrder={sortOrder}
      />
      <Row gutter={[16, 16]}>
        {filteredCars.map((car) => (
          <Col key={car.id} xs={24} sm={12} md={8} lg={6}>
            <CarCard car={car} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Catalog;

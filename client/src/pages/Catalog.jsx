import React, { useEffect, useState } from "react";
import { Select, Row, Col, Spin, Button } from "antd";
import { getCars } from "../api/cars";
import CarCard from "../components/CarCard";
import "../styles/catalog.scss";

const Catalog = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 12;

  useEffect(() => {
    getCars().then((data) => {
      setCars(data);
      setFilteredCars(data);
      setLoading(false);
    });
  }, []);

  const displayedCars = filteredCars.slice(0, currentPage * carsPerPage);

  return (
    <div className="catalog">
      {loading ? <Spin size="large" className="loading" /> : (
        <>
          <Row gutter={[16, 16]}>
            {displayedCars.map(car => (
              <Col key={car.id} xs={24} sm={12} md={8} lg={6} style={{ height: "100%" }}>
                <CarCard car={car} />
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

import { useState, useEffect } from "react";
import { Row, Col, Spin } from "antd";
import axios from "axios";
import CarCard from "./CarCard";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cars")
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch((err) => console.error("Ошибка загрузки данных:", err));
  }, []);

  if (loading) return <Spin size="large" />;

  return (
    <Row gutter={[16, 16]}>
      {cars.map((car) => (
        <Col key={car.id} xs={24} sm={12} md={8} lg={6}>
          <CarCard car={car} />
        </Col>
      ))}
    </Row>
  );
};

export default CarList;

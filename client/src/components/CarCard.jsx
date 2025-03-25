import { Card } from "antd";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <Link to={`/car/${car.id}`} style={{ textDecoration: "none" }}>
      <Card
        hoverable
        cover={<img alt={car.name} src={car.picture[0]} />}
        style={{ width: "100%" }}
      >
        <h3>{car.name}</h3>
        <p>Цена: {car.price} ₽</p>
      </Card>
    </Link>
  );
};

export default CarCard;

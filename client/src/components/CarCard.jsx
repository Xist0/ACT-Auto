import { Card } from "antd";
import { Link } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import {
  CarOutlined,
  DashboardOutlined,
  CalendarOutlined,
  BgColorsOutlined,
  SettingOutlined
} from "@ant-design/icons";
import "../styles/carCard.scss";

const CarCard = ({ car }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      // Убираем setMaxHeight, если не передается и не используется
      // Вместо этого можно использовать CSS для управления высотой
    }
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    setFade(true);
    setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % car.picture.length);
      setFade(false);
    }, 200);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setFade(true);
    setTimeout(() => {
      setCurrentImage((prev) => (prev - 1 + car.picture.length) % car.picture.length);
      setFade(false);
    }, 200);
  };

  const truncateTitle = (title) => {
    return title.split(" ").slice(0, 3).join(" ") + (title.split(" ").length > 3 ? "..." : "");
  };

  return (
    <Link to={`/car/${car.id}`} className="car-card">
      <Card hoverable className="car-card-content" ref={cardRef}>
        <div className="image-container">
          <img
            src={car.picture[currentImage]}
            alt={car.name}
            className={`car-image ${fade ? "fade-enter" : ""}`}
          />
          {car.picture.length > 1 && (
            <>
              <button className="prev-btn" onClick={handlePrev}><LeftOutlined /></button>
              <button className="next-btn" onClick={handleNext}><RightOutlined /></button>
            </>
          )}
        </div>
        <div className="car-info">
          <h3 className="car-title">{truncateTitle(car.name)}</h3>
          <p className="price">{car.price.toLocaleString()} ₽</p>
          <div className="car-icons">
            <span><SettingOutlined /> {car.param.find(p => p.name === "КПП")?._}</span>
            <span><BgColorsOutlined /> {car.param.find(p => p.name === "Цвет")?._}</span>
            <span><DashboardOutlined /> {car.param.find(p => p.name === "Пробег")?._} км</span>
            <span><CalendarOutlined /> {car.param.find(p => p.name === "Год выпуска")?._}</span>
            <span><CarOutlined /> {car.param.find(p => p.name === "Привод")?._}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CarCard;

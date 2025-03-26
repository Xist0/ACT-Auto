import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById } from "../api/cars";
import "../styles/carDetails.scss";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    getCarById(id).then((data) => {
      setCar(data);
      setMainImage(data.picture[0]); // Первое фото - главное
    });
  }, [id]);

  if (!car) return <div>Загрузка...</div>;

  const handleBackToCatalog = () => {
    navigate("/catalog"); // Переход в каталог
  };

  return (
    <div className="car-details">
      <div className="back-button-container">
        <button className="back-button" onClick={handleBackToCatalog}>
          Вернуться в каталог
        </button>
      </div>

      <div className="car-content">
        {/* Контейнер для фото и характеристик */}
        <div className="gallery">
          <div className="main-image-wrapper">
            <img className="main-image" src={mainImage} alt={car.name} />
          </div>
          <div className="thumbnail-container">
            {car.picture.map((img, index) => (
              <img
                key={index}
                className="thumbnail"
                src={img}
                alt={`Фото ${index + 1}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Контейнер для информации о машине */}
        <div className="info">
          <h2>{car.name}</h2>
          <p className="price">{car.price.toLocaleString()} ₽</p>
          <div className="car-specs">
            <ul>
              {car.param.map((item) => (
                <li key={item.name} className="car-spec">
                  <strong>{item.name}: </strong> {item._}
                </li>
              ))}
            </ul>
          </div>
          <button className="contact-button">Оставить заявку</button>
        </div>
      </div>

      {/* Блок описания автомобиля */}
      <div className="description">
        <ul>
          {car.description.split("\r\n").map((desc, index) => (
            <li key={index} className="description-item">{desc}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarDetails;

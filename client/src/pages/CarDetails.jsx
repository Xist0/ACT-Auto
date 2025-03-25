import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarById } from "../api/cars";
import "../styles/carDetails.scss";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    getCarById(id).then((data) => {
      setCar(data);
      setMainImage(data.picture[0]); // Первое фото - главное
    });
  }, [id]);

  if (!car) return <div>Загрузка...</div>;

  return (
    <div className="car-details">
      <div className="gallery">
        <img className="main-image" src={mainImage} alt={car.name} />
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
      <div className="info">
        <h2>{car.name}</h2>
        <p className="price">{car.price.toLocaleString()} ₽</p>
        <p>{car.description}</p>
        <button className="contact-button">Оставить заявку</button>
      </div>
      <div className="specs">
        <h3>Характеристики</h3>
        <ul>
          {car?.params?.map((param, index) => (
            <p key={index}>
              <strong>{param.name}:</strong> {param.value}
            </p>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarDetails;

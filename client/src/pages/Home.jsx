import { Button } from "antd";
import { Link } from "react-router-dom";
import FeedbackForm from "../components/FeedbackForm";
import "../styles/home.scss";

const Home = () => {
  return (
    <div className="home">
      <video autoPlay loop muted className="background-video">
        <source src="/video/promo.mp4" type="video/mp4" />
      </video>
      <div className="home-content">
        <h1>Добро пожаловать в ACT Auto</h1>
        <p>Лучшие автомобили по выгодным ценам.</p>
        <Link to="/catalog">
          <Button type="primary" size="large">Перейти в каталог</Button>
        </Link>
      </div>
      <FeedbackForm />
    </div>
  );
};

export default Home;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import CarDetails from "./pages/CarDetails";
import Service from "./pages/Service";
import Contacts from "./pages/Contacts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CarList from "./components/CarList";
import "./styles/global.scss";

const App = ({ theme, toggleTheme }) => {
  return (
    <div className={`app ${theme}`}>
      <Header toggleTheme={toggleTheme} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/test-api" element={<CarList />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;

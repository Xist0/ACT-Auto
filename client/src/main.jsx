import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.scss";

const Root = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <BrowserRouter>
      <App theme={theme} toggleTheme={toggleTheme} />
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);

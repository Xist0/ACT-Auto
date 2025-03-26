import { Menu, Switch } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.body.setAttribute("data-theme", theme);
  };

  return (
    <div className="header">
      <Menu mode="horizontal">
        <Menu.Item key="1">
          <Link to="/">Главное</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/catalog">Каталог</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/service">Сервис</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/contacts">Контакты</Link>
        </Menu.Item>
      </Menu>
      <Switch checked={theme === "dark"} onChange={toggleTheme} />
    </div>
  );
};

export default Header;

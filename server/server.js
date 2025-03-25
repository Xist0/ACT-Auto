require("dotenv").config();
const express = require("express");
const cors = require("cors");
const carsRouter = require("./routers/cars");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Подключаем маршрут API для машин
app.use("/api/cars", carsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});

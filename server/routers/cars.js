const express = require("express");
const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

const router = express.Router();
const xmlFilePath = path.join(__dirname, "../data/9b5d5376d122532428f9ec29d4c26646.xml");

const parseXML = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(xmlFilePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
      parser.parseString(data, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        const offers = result.yml_catalog.shop.offers.offer;
        resolve(offers);
      });
    });
  });
};

// API для получения списка машин
router.get("/", async (req, res) => {
  try {
    const cars = await parseXML();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при загрузке данных", error });
  }
});

router.get("/:id", async (req, res) => {
    try {
      const cars = await parseXML();
      const car = cars.find((c) => c.id === req.params.id);
      
      if (!car) {
        return res.status(404).json({ message: "Машина не найдена" });
      }
  
      res.json(car);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при загрузке данных", error });
    }
  });
  
module.exports = router;

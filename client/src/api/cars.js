const API_URL = "http://localhost:5000/api/cars"; // Адрес сервера

// Получение всех машин
export const getCars = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Ошибка загрузки машин");
    return await response.json();
  } catch (error) {
    console.error("Ошибка запроса машин:", error);
    return [];
  }
};

// Получение одной машины по ID
export const getCarById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Ошибка загрузки машины");
    return await response.json();
  } catch (error) {
    console.error("Ошибка запроса машины:", error);
    return null;
  }
};

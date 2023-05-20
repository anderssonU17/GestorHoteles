import axios from 'axios';

const URL = 'http://localhost:3005/api/';

export const listHotels = async () => {
  try {
    const response = await axios.get(`${URL}read-hotels`);
    console.log(response);
    if (response.data && Array.isArray(response.data['Hoteles encontrados'])) {
      return response.data['Hoteles encontrados'];
    } else {
      console.error("La respuesta no contiene una matriz de hoteles:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los hoteles:", error);
    return [];
  }
};
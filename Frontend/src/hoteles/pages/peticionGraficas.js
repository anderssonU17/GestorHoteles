import axios from "axios";
import Swal from "sweetalert2";

const URL = "http://localhost:3000/api/";
export const topHotels = async () => {
  try {
    const response = await axios.get(`${URL}hotels-most-visited`);
    return response.data.findHotels;
    
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Algo salió mal",
      text: "No se ha podido iniciar sesión",
    });
  }
};
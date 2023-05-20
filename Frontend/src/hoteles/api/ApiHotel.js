import axios from 'axios';
import Swal from "sweetalert2";

const URL = 'http://localhost:3005/api/';

export const listHotels = async () => {
  try {
    const response = await axios.get(`${URL}read-hotels`);
    console.log(response);
    if (response.data && Array.isArray(response.data.hotels)) {
      return response.data.hotels;
    } else {
      console.error("La respuesta no contiene una matriz de hoteles:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener los hoteles:", error);
    return [];
  }
};

export const CreateUser = async (_name, _email, _password, _rol) => {
  try {

      if(_rol == '' || !_rol) {_rol = 'USER'}

      const usersave = await axios.post(`${URL}create-user`, {
          name: _name,
          email: _email,
          password: _password,
          rol: _rol
      })

      // Mensaje si se guardo el usuario correctamente
      Swal.fire({
          icon: "success",
          title: "¡Usuario creado correctamente!",
          showConfirmButton: true,
          confirmButtonText: "OK"
      }).then(() => {
          // Redirigir al login cuando se haya guardado el usuario
          window.location.href = "/login";
      });
      
  } catch (error) {
      // Mostrar mensaje de error si no se guardo en el backend
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
          showConfirmButton: true,
          confirmButtonText: "OK"
      });
  }
};
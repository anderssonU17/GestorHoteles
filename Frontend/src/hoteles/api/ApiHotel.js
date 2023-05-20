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

export const CreateUser = async (name, email, password, rol) => {
  try {
      const usersave = await axios.post(`${URL}create-user`, {
          name: name,
          email: email,
          password: password,
          rol: rol
      });
      
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
          text: "No se pudo guardar el usuario.",
          showConfirmButton: true,
          confirmButtonText: "OK"
      });
  }
};
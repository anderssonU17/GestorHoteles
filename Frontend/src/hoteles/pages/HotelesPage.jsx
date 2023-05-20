import React, { useEffect, useState } from "react";
import { listHotels } from '../api/ApiHotel.js';

export const HotelesPage = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const result = await listHotels();
        if (Array.isArray(result)) {
          setHotels(result);
        } else {
          console.error("Los datos devueltos no son un array:", result);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <>
      <h1 className="text-decoration-underline">CRUD DE HOTELES</h1>
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de Hotel</th>
              <th>Descripcion</th>
              <th>Direccion</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(hotels) && hotels.length === 0 ? (
              <tr>
                <td colSpan={5}>No se han encontrado hoteles registrados.</td>
              </tr>
            ) : (
              hotels.map(hotelActual => (
                <tr key={hotelActual._id}>
                  <td>{hotelActual._id}</td>
                  <td>{hotelActual.name}</td>
                  <td>{hotelActual.description}</td>
                  <td>{hotelActual.address}</td>
                  <td>
                    <button className='btn btn-danger margen-button'>
                      Eliminar
                    </button>
                    <button className='btn btn-warning margen-button'>
                      Editar
                    </button>
                    <button className='btn btn-success margen-button'>
                      Ver
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
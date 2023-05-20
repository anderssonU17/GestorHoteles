import React, { useEffect, useState } from "react";
import {listHotels} from '../api/ApiHotel.js';

export const HotelesPage = () => {
  const [hotels, setHotels] = useState([]);

  const reload = async() => {
    const result = await listHotels();
    setHotels(result);
  };

  useEffect(() => {
    reload();
    console.log(hotels);
  }, [])
  

  return (
    // Codigo a modificar y pasar a cards 
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
                  // Undefined maps 
                    {hotels.map(hotelActual=>{
                        return(
                            <tr key={hotelActual._id}>
                        <td>{hotelActual._id}</td>
                        <td>{hotelActual.name}</td>
                        <td>{hotelActual.description}</td>
                        <td>{hotelActual.address}</td>
                        <td>
                            <button className='btn btn-danger margen-button'>
                                Eliminar
                                </button>
                            <button className='btn btn-warning margen-button'>Editar</button>
                            <button className='btn btn-success margen-button'>Ver</button>
                        </td>
                    </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </>
  )
}

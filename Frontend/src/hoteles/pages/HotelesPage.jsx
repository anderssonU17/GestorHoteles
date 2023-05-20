import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listHotels } from '../api/ApiHotel';

export const HotelesPage = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const result = await listHotels();
        if (Array.isArray(result)) {
          setHotels(result);
        } else {
          console.error('Los datos devueltos no son un array:', result);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  const renderHotelCards = () => {
    return hotels.map((hotel, index) => (
      <div className="col-md-4 mb-4 animate__animated animate__fadeIn" key={hotel._id}>
        <div className="card">
          <img src={`/src/assets/hoteles/hotel${index + 1}.jpg`} className="card-img-top" alt={`Hotel ${hotel._id}`} />
          <div className="card-body">
            <h5 className="card-title">{hotel.name}</h5>
            <p className="card-text">{hotel.description}</p>
            <p className="card-text">{hotel.address}</p>
            <Link to={`/rooms/${hotel._id}`} className="btn btn-outline-secondary">Habitaciones Disponibles</Link>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-4">Bienvenido a nuestro sitio de hoteles</h1>
          <p className="lead">Aquí encontrarás una selección de los mejores hoteles para tu estadía.</p>
          <hr className="my-4" />
          <p>Puedes explorar los hoteles disponibles y realizar reservaciones.</p>
        </div>
      </div>

      <div className="container">
        <div className="row mt-4">
          {renderHotelCards()}
        </div>
      </div>

      <footer className="footer mt-auto py-3 bg-light text-center">
        <div className="container">
          <span className="text-muted">© 2023 Hotel Website. Todos los derechos reservados.</span>
        </div>
      </footer>
    </>
  );
};

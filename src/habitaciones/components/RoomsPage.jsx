import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoomsByHotel } from '../api/ApiRoom';

export const RoomsPage = () => {
  const { hotelId } = useParams();
  const [hotelRooms, setHotelRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await getRoomsByHotel(hotelId);
        console.log('Habitaciones en estado:', rooms);
        setHotelRooms(rooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [hotelId]);

  const renderRoomCards = () => {
    if (!hotelRooms) {
      return <p>Cargando habitaciones...</p>;
    }

    if (hotelRooms.length === 0) {
      return <p>No hay habitaciones disponibles en este hotel.</p>;
    }

    return hotelRooms.map((room) => (
      <div className="card mb-3" key={room._id}>
        <div className="card-header">
          <h5 className="card-title">{room.number}</h5>
        </div>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">{room.type}</h6>
          <p className="card-text">{room.description}</p>
          <p className="card-text">
            <strong>Precio:</strong> ${room.price}
          </p>
          <p className="card-text">
            <strong>Disponibilidad:   </strong>
            <span className={`badge ${room.available ? 'bg-success' : 'bg-danger'}`}>
              {room.available ? 'Disponible' : 'No disponible'}
            </span>
          </p>
          <button className="btn btn-primary">Adquirir habitación</button>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h1>Habitaciones del Hotel</h1>
      <div className="card-columns">
        {renderRoomCards()}
      </div>
      <footer className="footer mt-auto py-3 bg-light text-center">
        <div className="container">
          <span className="text-muted">© 2023 Hotel Website. Todos los derechos reservados.</span>
        </div>
      </footer>
    </div>
  );
};



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
      <div className="card" key={room._id}>
        <div className="card-body">
          <h5 className="card-title">Room Number: {room.number}</h5>
          <p className="card-text">Description: {room.description}</p>
          <p className="card-text">Type: {room.type}</p>
          <p className="card-text">Price: {room.price}</p>
          <p className="card-text">Availability: {room.available ? 'Available' : 'Not Available'}</p>
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
    </div>
  );
};


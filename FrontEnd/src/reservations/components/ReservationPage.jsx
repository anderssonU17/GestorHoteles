import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { createReservation } from '../api/ApiReservation';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

export const ReservationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState(location.state?.roomId || '');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createReservation({
        room: roomId,
        checkIn,
        checkOut,
      });

      console.log(response);

      // Mostrar SweetAlert para preguntar si desea agregar un servicio
      Swal.fire({
        title: '¿Desea agregar un servicio?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          // Navegar a la página de servicios
          navigate('/servicios');
        } else {
          // Mostrar SweetAlert con mensaje de confirmación
          Swal.fire('¡Reserva creada!', 'Pronto enviaremos su factura.', 'success');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '500px' }}>
        <Card.Body>
          <Card.Title className="text-center">Detalles de la reserva</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="roomId">
              <Form.Label>ID de la habitación:</Form.Label>
              <Form.Control type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="checkIn">
              <Form.Label>Fecha de check-in:</Form.Label>
              <Form.Control type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="checkOut">
              <Form.Label>Fecha de check-out:</Form.Label>
              <Form.Control type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            </Form.Group>
            <hr />

            <div className="d-flex justify-content-between">
              <Button variant="success" type="submit">
                Listo
              </Button>

              <Button variant="secondary">Agregar Servicios</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

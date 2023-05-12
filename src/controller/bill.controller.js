'use strict'
const { validateAdminHotel } = require('../helpers/validateAdminHotel');
const Bill = require('../models/bill.model');
const Hotel = require('../models/hotel.model');
const Room = require('../models/room.model');
const Reservation = require('../models/reservation.model');
const Service = require('../models/services.model');

const createBill = async(req, res) =>{
    try {
        
        let idUser  = req.user._id;
        const {idReservation} = req.body;

        const Hotel = await findHotelByReservation( idReservation );
        

        //Verificar que el usuario logueado sea el admin del hotel donde esta la reservacion
        const isAdmin = validateAdminHotel( idUser, Hotel._id )
        if( !isAdmin ) return res.status(400).send({ message: `El usuario logueado no es el administrador del hotel, solo el administrador del hotel puede realizar faturas.` })

        //Contruir la factura utilizando la reservacion
        //Primero obtenemos todos los datos de la reservacion
        const _reservation = await Reservation.findById(idReservation);
        if( !_reservation ) return res.status(404).send({ message: `No se encontro la reservacion en la base de datos.` })

        let newBill = new Bill();
        newBill.reservation = idReservation;
        newBill.user = _reservation.user;
        newBill.room = _reservation.room;

        //Ordenamos los servicios para obtener un arreglo con la cantidad de cada servicio, junto a su precio y nombre
        const serviceInformation = await orderServices(_reservation.services)



    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la operacion.'})
    }
}

// **************** Funciones de ayuda

const findHotelByReservation = async(idReservation)=>{
    try {
        const reservation = await Reservation.findById(idReservation)
        
        if( !reservation ) return console.log(`no se econtro la reservacion`);

        const room = await Room.findById(reservation.room)
        if( !room ) return console.log('no se econtro la habitacion');

        const hotel = await Hotel.findById(room.hotel)
        if( !hotel ) return console.log('no se econtro el hotel');

        return hotel;

    } catch (error) {
        console.error(error)
    }
}

const orderServices = async(services) =>{
    try {
        console.log(`***********Comenzando la funcion orderServices`);
        class serviceToBill {
            constructor(name, price, quantity) {
                this.name = name,
                    this.price = price,
                    this.quantity = quantity;
            }
        }

        let _orderedServices = [];

        for (let i = 0; i < services.length; i++) {
            
            let _service = await Service.findById(services[i]);
            // console.log(`Vuelta ${i}, servicio encontrado: ${_service}`);
            let newServiceToBill = new serviceToBill( _service.name, _service.price, 0  );
            _orderedServices.push(newServiceToBill)
        }

        console.log(orderServices);

    } catch (error) {
        console.error(error)
    }
}

module.exports = {createBill}
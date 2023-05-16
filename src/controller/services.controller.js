'use strict'
const Servie = require("../models/services.model");
const Hotel = require('../models/hotel.model');
const Reservation = require('../models/reservation.model')
const User = require('../models/user.model')

const { validateAdminHotel } = require("../helpers/validateAdminHotel");

const createService = async(req,res)=>{
    try {
        
        let idUser = req.user.id;
        const {name,hotel} = req.body;

        //Comprobar que el hotel existe, luego que no haya ya un servicio en el hotel con ese nombre
        const hoteExists = await Hotel.findById(hotel);
        const nameServiceExists = await Servie.findOne({hotel,name});

        if(!hoteExists) return res.status(404).send({message: 'No se ha encontrado el hotel de refencia.'});
        if(nameServiceExists) return res.status(400).send({message: 'El nombre del servicio ya esta en uso.'});

        //Comprobar que el usuario logueado sea el admin del hotel
        if( !( await validateAdminHotel(idUser, hotel) ) ) return res.status(400)
        .send({message:
             'El usuario no es el administrador del hotel, solo el administrador puede agregar servicios a su hotel.'
            })

        let newService = new Servie(req.body);
        newService = await newService.save();

        if(!newService) return res.status(400).send({message: `No fue posible agregar el servicio.`});

        return res.status(200).send({message: `Se creo el servicio correctamente.`, newService})


    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la operacion.'})
    }
}

const readServicesByHotel = async(req, res) => {

    try {
        
        const {idHotel} = req.body;

        //Comprobar que el hotel exista
        const existsHotel = await Hotel.findById(idHotel);
        if(!existsHotel) return res.status(404).send({message: `No se ha encontrado el hotel en la bse de datos.`})

        //Bucar los servicios que conincidan con el id del hotel ingresado
        const servicesByHotel = await Servie.find({hotel: idHotel});
        
        //Si no se encontraron servicios coincidentes entonces se retorna el error
        if(servicesByHotel.length == 0) 
        return res.status(400).send({message: `Este hotel aun no tiene servicios disponibles.`})

        return res.status(200).send({
            message: `Servicios del hotel, ${existsHotel.name}`, servicesByHotel
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la operacion.'})
    }

}

const updateServices = async(req, res) => {

    try {
        
        //Obtener los datos necesarios para la accion
        const idUser  = req.user._id;
        const { hotel, idService , name} = req.body;

        //Comprobar que el hotel exista
        const hotelExists = await Hotel.findById( hotel );
        if( !hotelExists ) return res.status(400).send({message: `El hotel buscado no existe.`});

        //Comprobar que el usuario logueado sea el admin del hotel
        let userIsAdmin =  await validateAdminHotel( idUser , hotel );
        if ( !userIsAdmin ) {

            return res.status(400).send({message: `El usuario logueado no es el administrador del hotel.`})
        
        }

        //Comprobar que el nombre del servicio no este registrado ya en el hotel
        if (  await newNameServiceExists( hotel, idService, name ) ){
            return res.status(400).send({message: `El nombre del servicio ya esta en uso`});
        }

        //Se crea el nuevo servicio basandonos en los datos enviados.
        let newService = new Servie(req.body);
        newService._id = idService;
        
        //Se actualiza el servicio
        newService = await Servie.findByIdAndUpdate(idService, newService, {new: true});

        if( newService ){

            return res.status(200).send( { message: `Se actualizo el servicio correctamente.`, newService } );

        }else{
            return res.status(400).send( { message: `No se encontro el servicio en la base de datos.` } )
        }
        
    } catch (error) {
        
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la operacion.'})

    }

}

const deleteService = async(req, res) =>{
    try {
        
        //Obtener los datos necesarios para la funcion
        let idUser  = req.user._id;
        const {idService}  = req.body;

        //Comproabar que el servicio exista
        const serviceExists = await Servie.findById(idService);

        //Comprobar que el usuario logueado sea el admin del hotel al que pertenece el servicio
        if ( ! validateAdminHotel( idUser, serviceExists.hotel ) ) 
            return res.status(400).send({message: `Solo el administrador del hotel puede eliminar servicios del hotel.`})
        
        const _deleteService = await Servie.findByIdAndDelete( idService );

        _deleteService ? 
        res.status(200).send({ message: `Se ha eliminado correctamente el servicio.`, _deleteService })
        :
        res.status(400).send({message: `No se encontro el servicio en la base de datos.`})


    } catch (error) {
        console.error(error);
        res.status(500).send({message: `No se ha podidio completar la operacion.`})
    }
}

const addServiceToReservation = async(req, res) =>{
    try {
        
        //Obtener los datos necesarios para la funcion
        let idUser  = req.user._id;
        const {idService, idReservation}  = req.body;

        //Comproabar que el servicio exista
        const serviceExists = await Servie.findById(idService);

        if(!serviceExists) return res.status(404).send({message: `No se ha encontrado el servicio enl a base de datos.`});
        
        //Comprobar que el usuario logueado sea el administrador del hotel
        if ( !validateAdminHotel( idUser , serviceExists.hotel ) ) return res.status(400).send({ message: 'El usuario no es el administrador del hotel, no tiene permisos para agregar servicios a una reservacion.' })

        //Agregar el servicio a la reservacion
        //Primero buscar la resrvacion para preparar los datos que seran sustituidos en la actualizacion luego
        const _reservation = await Reservation.findById(idReservation);
        const newTotalPrice = _reservation.totalPrice + serviceExists.price;
        
        const reservationToaddService = await Reservation.findOneAndUpdate( 
            { _id: idReservation },
            {
                $push: {
                    services: idService
                }
                , totalPrice: newTotalPrice
            },
            {new: true}
            )
        

        if(reservationToaddService){
            return res.status(200).send({message: `Se agrego el servicio ${serviceExists.name} a la reservacion ${reservationToaddService._id}`, reservationToaddService})
        }else{
            return res.status(404).send({ message: `No se encontro la reservacion en la base de datos.` })
        }

    } catch (error) {
        console.error(error)
        res.status(500).send({message: `No se ha podidio completar la operacion.`})
    }
}

// ************************************** Funciones de ayuda

/* Comprobar que el nombre del servicio no este en uso, si esta en uso verificar que el servicio actualizado sea el mismo
que el que ya tiene ese nombre, de lo contrario nos regresa false */

const newNameServiceExists = async (  idHotel, idService, nameService ) =>{
    try {
        
        const serviceId = idService.toString();

        const serviceExist = await Servie.findOne( { name: nameService, hotel: idHotel } )
        
        if( !serviceExist ){
            return false
        }
        
        if( serviceExist._id ==  serviceId) return false;

        return serviceExist;

    } catch (error) {
        console.error(error);
    }
}

// ************* Exportaciones
module.exports = {createService , readServicesByHotel, updateServices , deleteService , addServiceToReservation}
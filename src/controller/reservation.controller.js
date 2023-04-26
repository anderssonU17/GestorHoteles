'use strict'
const User = require("../models/user.model");
const Hotel = require("../models/hotel.model");
const Room = require("../models/room.model");
const Reservation = require("../models/reservation.model");

const createReservation = async(req, res)=>{
    try {
        
        let idUser = req.user.id;

        const {room,checkIn,checkOut} = req.body;

        const findUser = await User.findById(idUser);
        if(!findUser) return res.status(404).send({message: `No se encontro al usuario dentro de la base de datos.`});

        const findRoom = await Room.findById(room);
        if(!findRoom) return res.status(404).send({message: `No se encontro la habitacion dentro de la base de datos.`});

        //Verificar que las fechas no sean pasadas
        if(checkIn < Date.now() && checkOut < Date.now() || checkOut < checkIn) return res.status(400).send({message: 'Las fechas ingresadas no son validas.'})

        //Verificar que las reservaciones no se sobrepongan
        let roomReservations = await Reservation.find({room: room});
        
        let validDate = checkDate(roomReservations, checkIn, checkOut);
        if(validDate == false) return res.status(400).send({message: 'La fecha que trata de reservar se sobrepone a otra(s).'});

        let newReservation = new Reservation();
        newReservation.user = findUser._id;
        newReservation.room = findRoom._id;
        newReservation.checkIn = checkIn;
        newReservation.checkOut = checkOut;
        newReservation.totalPrice = findRoom.price;


        newReservation = await newReservation.save();

        await addReservationToUser(findUser._id, newReservation._id);

        newReservation ?
        res.status(200).json({msg: 'Se ha realizado la reservacion con exito.', 'Datos de la reservacion': newReservation})
        :
        res.status(500).send({msg: 'No se ha se ha hecho la reservacion.'});


    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false, 
            message: `No se ha hecho la resevacion.`, 
            error: err,
        });
    }
}

const readUserReservations = async(req, res)=>{
    try {
        
        const idUser = req.user.id;

        const findReservations = await Reservation.find({user: idUser});
        if(findReservations.length == 0) return res.status(404).send({message: 'No se han encotrado reservaciones para este usuario.'});

        return res.status(200).json({'Reservaciones del usuario': findReservations});

    } catch (error) {
        console.log(err)
        res.status(500).json({
            ok: false, 
            message: `No se ha podido ver las resevaciones del usuario.`, 
            error: err,
        });
    }
}

const updateReservation = async(req, res)=>{
    try {
        
        let idUser = req.user.id;
        const{idReservation,room,checkIn,checkOut} = req.body;
        
        const findReservation = await Reservation.findById(idReservation);
        
        if(!findReservation) return res.status(404).send({message: `No se ha encontrado la reservacion`})

        const reservation_user = await Reservation.find({user: idUser, _id: idReservation});
        if(reservation_user.length == 0) res.status(400).send({message: 'Este usuario no esta asociado a la reservacion'})

        const findUser = await User.findById(idUser);
        if(!findUser) return res.status(404).send({message: `No se encontro al usuario dentro de la base de datos.`});

        const findRoom = await Room.findById(room);
        if(!findRoom) return res.status(404).send({message: `No se encontro la habitacion dentro de la base de datos.`});

        //Verificar que las fechas no sean pasadas
        if(checkIn < Date.now() && checkOut < Date.now() || checkOut < checkIn) return res.status(400).send({message: 'Las fechas ingresadas no son validas.'})

        //Verificar que las reservaciones no se sobrepongan
        let roomReservations = await Reservation.find({room: room});
        
        let validDate = await checkDateUpdate(roomReservations,idReservation,room, checkIn, checkOut);
        if(validDate == false) return res.status(400).send({message: 'La nueva fecha que trata de reservarse sobrepone a otra(s).'});

        const newReservation = await Reservation.findByIdAndUpdate({_id: idReservation},{room: room, checkIn: checkIn, checkOut: checkOut})
        
        newReservation ?
        res.status(200).send({message: 'Se ha actualizado la reservacion.', newReservation})
        :
        res.status(404).send({message: `No se ha encontrado la reservacion en la base de datos.`})

    } catch (error) {
        console.log(err)
        res.status(500).json({
            ok: false, 
            message: `No se ha podido actualizar la reservacion.`, 
            error: err,
        });
    }
}

const deleteReservation = async(req, res)=>{
    try {
        
        let idUser = req.user.id;
        const{idReservation} = req.body;

        const findReservation = await Reservation.findById(idReservation);
        if(!findReservation) return res.status(404).send({message: `No se ha encontrado la reservacion`})

        const reservation_user = await Reservation.find({user: idUser, _id: idReservation});
        if(reservation_user.length == 0) res.status(400).send({message: 'Este usuario no esta asociado a la reservacion'})

        const delete_Reservation = await Reservation.findByIdAndDelete(idReservation);

        await deleteReservationToUser(idUser,idReservation);

        delete_Reservation ? 
        res.status(200).send({msg: 'Se ha eliminado la reservacion',delete_Reservation})
        :
        res.status(404).send({msg: 'No se ha eliminado la reservacion.', delete_Reservation})

    } catch (error) {
        console.log(err)
        res.status(500).json({
            ok: false, 
            message: `No se ha eliminado la resevacion.`, 
            error: err,
        });
    }
}

// ************************************** Funciones de ayuda

const checkDate = (arrayDate, checkIn, checkOut)=>{

    for (let i = 0; i < arrayDate.length; i++) {

        if(Date.parse(checkIn) <= Date.parse(arrayDate[i].checkOut) && Date.parse(checkOut) >= Date.parse(arrayDate[i].checkIn)){
            return false;
        }
        
    }
    return true;
}

const checkDateUpdate = (arrayDate,idReservation,room, checkIn, checkOut)=>{

    for (let i = 0; i < arrayDate.length; i++) {

        if(Date.parse(checkIn) <= Date.parse(arrayDate[i].checkOut) && Date.parse(checkOut) >= Date.parse(arrayDate[i].checkIn)){
            //Si la coincidencia es con la reservacion ya existente se permite sobreponerse
            if(idReservation == arrayDate[i]._id && room == arrayDate[i].room){
                return true;
            }
            return false;
        }
        
    }
    return true;
}

const addReservationToUser = async(idUser, idReservation)=>{

    await User.findByIdAndUpdate({_id: idUser},
            {
                $push: {
                    reservations: idReservation,
                }
            },
            {new: true}
        )

}

const deleteReservationToUser = async(idUser, idReservation)=>{

    await User.findByIdAndUpdate({_id: idUser},
        {
            $pull: {
                reservations: idReservation,
            }
        },
        {new: true}
    )

}

const changeAvailableHotel = async()=>{
    try {
        
        const allReservations = await Reservation.find();
        if(allReservations.length == 0) return null;

        for (let index = 0; index < allReservations.length; index++) {
            
            const room = await Room.findById( allReservations[i].room );
            if( Date.parse( allReservations[index].checkIn ) == now() ) {
                room.available = false;
                await room.save();
            }
            if( Date.parse( allReservations[index].checkOut ) < now() )
                room.available = true;
                await room.save();
        }

    } catch (error) {
        console.error(error)
    }
}

module.exports = {createReservation,readUserReservations,updateReservation,deleteReservation};
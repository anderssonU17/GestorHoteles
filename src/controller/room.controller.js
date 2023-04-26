'use strict'

const Hotels = require('../models/hotel.model');
const Room  = require('../models/room.model');

const createRoom = async(req, res) =>{
    try {
        
        const {number,hotel} = req.body;
        
        const findHotel = await Hotels.findById(hotel);
        if(!findHotel) return res.status(404).send({message: 'El hotel no se encontro dentro de la base de datos.'})

        let newRoom = await Room.findOne({hotel: hotel, number: number});
        if(newRoom) return res.status(400).send({message: `Ya hay un numero de habitacion ${number}, en el hotel con el id ${hotel}`})

        newRoom = new Room(req.body);

        newRoom = await newRoom.save();

        findHotel.rooms.push(newRoom._id);
        await findHotel.save();

        res.status(200).send({message: 'Se creo la habitacion correctamente.', newRoom})

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la operacion'})
    }
}

const readRooms = async(req, res)=>{
    try {
        
        const rooms = await Room.find();
        if(rooms.length == 0) return res.status(404).send({message: `No se han encontrado habitaciones`});
        
        res.status(200).json({'Habitaciones encontradas': rooms})

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la operacion'})
    }
}

const updateRoom = async(req, res)=>{
    try {
        
        let {number, hotel} = req.body;
        const {id} = req.params;

        //Verificar si existe el hotel nuevo
        
        const findHotel = await Hotels.findOne({_id: hotel}); 
        if(!findHotel){
            return res.status(400).json({
                msg: 'No existe un hotel con este id',
                ok: false, 
            })
        }

        /*Verificar que el nuevo numero de cuarto no este en uso dentro del hotel, 
        si esta en uso solo pasara si el cuarto que lo esta usando es el mismo que se quiere editar*/
        const findNumber = await Room.findOne({number: number, hotel: hotel});
        if(findNumber && findNumber._id != id) return res.status(400).send({message: `El nuevo numero de cuarto ya esta en uso en el hotel.`})

        const roomComplete = await Room.findByIdAndUpdate({_id:id}, req.body, {new: true});
        if(roomComplete){
            return res.status(200).send({message: `Se edito el cuarto correctamente.`, roomComplete});
        }else{
            return res.status(400).send({message: `No se pudo editar el cuarto.`})
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la operacion'})
    }
}

const deleteRoom = async(req, res )=>{
    try {
        
        const {id} = req.params;

        const findRoom = await Room.findById(id);
        if(!findRoom) return res.status(404).send({message: `No se ha encontrado la habitacion.`})

        const roomDelete = await Room.findByIdAndDelete({_id: id});
        roomDelete 
        ? res.status(200).send({message: 'Se elimino la habitacion correctamente.', roomDelete}) 
        : res.status(404).send({message: `No se elimino la habitacion.`});

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la operacion'})
    }
}

module.exports = {createRoom,readRooms,updateRoom,deleteRoom};
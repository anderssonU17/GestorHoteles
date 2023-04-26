'use strict'

const Events = require('../models/event.model');
const Hotels = require('../models/hotel.model');

const createEvent = async (req, res) => {
    const {name, description, type, date, hotel} = req.body;

    try{
        //Verificar si ya existe un evento con nombre y fecha igual 
        const eventExist = await Events.findOne({name, date});

        if(eventExist){
            return res.status(400).json({
                msg: 'Ya existe un evento con este nombre y fecha',
            });
        }

        //Verificar si el hotel ingresado existe
        const hotelExist = await Hotels.findById(hotel);

        if(!hotelExist){
            return res.status(400).json({
                msg: 'El hotel no existe',
            });
        }

        //Crear el evento
        //Se coloca parentesis ya que es una funcion, de lo contrario es una propiedad
        const newEvent = new Events({
            name,
            description, 
            type, 
            date: new Date(date).toISOString().substring(0, 10), //Obtener la fecha en formato ISO y obtener los primeros 10 caracteres en formato YYYY-MM-DD
            hotel,
        });

        //Guardar Evento 
        await newEvent.save();

        //Agregar evento al modelo hoteles 
        hotelExist.events.push(newEvent._id);
        await hotelExist.save();

        return res.status(200).send({
            msg: 'Evento creado correctamente', 
            event: newEvent,
        })

    }catch(error){
        console.error(error);
        res.status(500).json()
    }
}

module.exports = {createEvent}
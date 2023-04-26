'use strict'


const {Router} = require('express');
const {check} = require('express-validator');
const {validateParams} = require('../middlewares/validate-params');

const { createEvent,readEventsForHotel ,deleteEvent} = require('../controller/event.controller');

const api = Router();

api.post('/create-event', createEvent);

api.get('/read-events-for-hotel',[
    check('id','El id es un parametro obligatorio para el uso de la funcion.'),
    validateParams
],readEventsForHotel);

api.delete('/delete-event',[
    check('id', 'El id es un parametro necesario para eliminar el evento'),
    validateParams
],deleteEvent)

module.exports = api;
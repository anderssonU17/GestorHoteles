'use strict'

const {Router} = require('express');
const {check} = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const {validateParams}  = require('../middlewares/validate-params');

const { createRoom,readRooms,updateRoom,deleteRoom} = require('../controller/room.controller');

const api = Router();

api.post('/create-room', [
    
    check('number', 'El parametro number es necesario para la creacion de una habitacion').not().isEmpty(),
    check('description', 'El parametro description es necesario para la creacion de una habitacion').not().isEmpty(),
    check('type', 'El parametro type es necesario para la creacion de una habitacion').not().isEmpty(),
    check('price', 'El parametro price es necesario para la creacion de una habitacion').not().isEmpty(),
    check('hotel', 'El parametro hotel es necesario para la creacion de una habitacion').not().isEmpty(),
    validateParams

], createRoom);

api.get('/read-rooms', readRooms);

api.put('/edit-room/:id', [
    
    check('number', 'El parametro number es necesario para la creacion de una habitacion').not().isEmpty(),
    check('description', 'El parametro description es necesario para la creacion de una habitacion').not().isEmpty(),
    check('type', 'El parametro type es necesario para la creacion de una habitacion').not().isEmpty(),
    check('price', 'El parametro price es necesario para la creacion de una habitacion').not().isEmpty(),
    check('hotel', 'El parametro hotel es necesario para la creacion de una habitacion').not().isEmpty(),
    validateParams

], updateRoom);

api.delete('/delete-room/:id', deleteRoom);

module.exports = api;
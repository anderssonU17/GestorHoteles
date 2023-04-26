'use strict'

const {Router} = require('express');
const {check} = require('express-validator');
const { createHotel, readHotels, editHotel, deleteHotel } = require('../controller/hotel.controller');
const {validateParams} = require('../middlewares/validate-params');

const api = Router();

api.post('/create-hotel',[
    
    check('name', 'El parametro name es necesario para la creacion de un hotel').not().isEmpty(),
    check('description', 'El parametro description es necesario para la creacion de un hotel').not().isEmpty(),
    check('address', 'El parametro address es necesario para la creacion de un hotel').not().isEmpty(),
    check('admin', 'El parametro admin es necesario para la creacion de un hotel').not().isEmpty(),
    validateParams

], createHotel);

api.get('/read-hotels', readHotels);

api.put('/edit-hotel/:id', editHotel);

api.delete('/delete-hotel/:id', deleteHotel);

module.exports = api;
'use strict'

const {Router} = require('express');
const {check} = require('express-validator');
const { createHotel, editHotel, deleteHotel } = require('../controller/hotel.controller');

const api = Router();

api.post('/create-hotel', createHotel);
api.put('/edit-hotel/:id', editHotel);
api.delete('/delete-hotel/:id', deleteHotel);

module.exports = api;
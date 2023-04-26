'use strict'
const {Router} = require('express');
const {validateJWT} = require('../middlewares/validate-jwt')
const {validateParams} = require('../middlewares/validate-params');
const {check} = require('express-validator');

const {createReservation,readUserReservations,updateReservation,deleteReservation} = require('../controller/reservation.controller');

const api = Router();

api.post('/create-reservation', [
    validateJWT,
    check('room', 'El parametro room es obligatorio para crear una reservacion.').not().isEmpty(),
    check('checkIn', 'El parametro checkIn es obligatorio para crear una reservacion.').not().isEmpty(),
    check('checkOut', 'El parametro checkOut es obligatorio para crear una reservacion.').not().isEmpty(),
    validateParams
], createReservation);

api.get('/read-user-reservations', [
    validateJWT
], readUserReservations)

api.put('/update-reservation',[
    validateJWT,
    check('idReservation', 'El parametro idReservation es obligatorio para editar una reservacion.').not().isEmpty(),
    validateParams
],updateReservation)

api.delete('/delete-reservation',[
    validateJWT,
    check('idReservation', 'El parametro idReservation es obligatorio para eliminar una reservacion.').not().isEmpty(),
    validateParams
],deleteReservation)

module.exports = api;
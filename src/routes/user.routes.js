'use strict'

const {Router} = require('express');
const {check} = require('express-validator');
const { createUser, loginUser, editUser, deleteUser, readUsers} = require('../controller/user.controller');
const {adminRol, validateJWT,validateParams} = require('../middlewares');


const api = Router();

api.post('/create-user',[
    check('name', 'El parametro name es necesario para la creacion de un servicio.').not().isEmpty(),
    check('email', 'El parametro email es necesario para la creacion de un servicio.').not().isEmpty(),
    check('password', 'El parametro password debe contar con 6 o mas caracteres.').isLength({min: 6}),
    validateParams
],createUser);
api.post('/login', loginUser);
api.get('/read-users',[
    adminRol
], readUsers)
api.put('/edit-user/:id', editUser);
api.delete('/delete-client', validateJWT, deleteUser);

module.exports = api;
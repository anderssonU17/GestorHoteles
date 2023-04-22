'use strict'

const {Router} = require('express');
const {check} = require('express-validator');
const { createUser, loginUser, editUser, deleteUser } = require('../controller/user.controller');
const { validateJWT } = require('../middlewares/validate-jwt');


const api = Router();

api.post('/create-user',createUser);
api.post('/login', loginUser);
api.put('/edit-user/:id', editUser);
api.delete('/delete-client', validateJWT, deleteUser);

module.exports = api;
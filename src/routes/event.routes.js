'use strict'


const {Router} = require('express');
const {check} = require('express-validator');
const { createEvent } = require('../controller/event.controller');

const api = Router();

api.post('/create-event', createEvent);

module.exports = api;
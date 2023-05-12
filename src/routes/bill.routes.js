const { Router } = require('express')
const { check } = require('express-validator')
const { validateParams } = require('../middlewares/validate-params')
const{ validateJWT } = require('../middlewares/validate-jwt')

const { createBill } = require('../controller/bill.controller')


const api = Router();

api.post('/create-bill',[
    validateJWT
],createBill);

module.exports = api;
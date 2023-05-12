'use strict'
const Bill = require('../models/bill.model');
const User = require('../models/user.model');
const Reservation = require('../models/user.model');

const createBill = async(req, res) =>{
    try {
        
        

    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'No se ha podido completar la operacion.'})
    }
}
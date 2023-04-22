'use strict'

const express = require('express');
const app = express();
const {connection} = require("./src/database/connection");
require('dotenv').config();
const port = process.env.PORT;
const routesU = require('./src/routes/user.routes');
const routesH = require('./src/routes/hotel.routes');
const routesE = require('./src/routes/event.routes');


connection();

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use('/api', routesU, routesH, routesE)

app.listen(port, ()=> {
    console.log(`Servidor corriendo en el puerto ${port}`);
})


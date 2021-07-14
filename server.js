require("./server/config")
const express = require("express");
const app = express();
const mongoose = require('mongoose');


//import mongoose from 'mongoose';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require('./server/routes/usuario'));

mongoose.connect(
    process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    (err, res) => {
        if (err) throw err;
        console.log("Base de Datos Conectada");
    });

app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto 3000");
})
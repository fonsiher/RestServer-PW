const express = require("express");
const app = express();
const Usuario = require('../models/usuario')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


app.get('/usuario', (req, res) => {
    res.json("get Usuario");
});

app.put('/usuario', function(req, res) {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            })
        };
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
});

app.post('/usuario', (req, res) => {
    res.json("post Usuario");
});
app.delete('/usuario', (req, res) => {
    res.json("delete Usuario");
});

module.exports = app;
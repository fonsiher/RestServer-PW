const express = require("express");
const app = express();
const Usuario = require('../models/usuario')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('underscore');


app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 3;
    limite = Number(desde);
    Usuario.find({ estado: true })
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    numero: conteo,
                    usuarios
                });

            })

        });

});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    // delete body.password;
    // delete body.google;
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario no hallado en la base de datos'
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});


app.post('/usuario', function(req, res) {

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
        });
    });

});


app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let desactivar = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, desactivar, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario no hallado en la base de datos'
            });
        }
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

module.exports = app;
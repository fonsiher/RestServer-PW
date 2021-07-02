require("./server/config")
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/usuario', (req, res) => {
    res.json("get Usuario");
});

app.put('/usuario', (req, res) => {
    let body = req.body;
    if (body.nombre == undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "El nombre es requerido"
        })
    } else {
        res.json({
            persona: body
        });
    }

});

app.post('/usuario', (req, res) => {
    res.json("post Usuario");
});
app.delete('/usuario', (req, res) => {
    res.json("delete Usuario");
});

app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto 3000");
})
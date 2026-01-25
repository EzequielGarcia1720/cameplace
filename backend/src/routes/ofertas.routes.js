// OFERTAS ROUTES
const express = require('express');
const router = express.Router();
const {
    GetAllOffers
} = require("../ofertas")

// GET. /api/v1/offers
app.get("/", async (req, res) => {
    // Leemos el filtro de la URL (?estado=ganando)
    const filterStatus = req.query.status; 

    let querySQL = 'SELECT * FROM ofertas';
    let parameters = [];

    // Si el usuario mandó un filtro (si filtroEstado NO está vacío)
    if (filterStatus) {
        querySQL = 'SELECT * FROM ofertas WHERE estado = $1';
        parameters = [filterStatus];
    }

    // Ejecutamos la consulta a la base de datos
    try {
        const result = await GetAllOffers(querySQL, parameters)
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
});



const express = require('express');
const router = express.Router();

// Importamos las funciones. 
// IMPORTANTE: "../ofertas" asume que ofertas.js está una carpeta atrás. 
// Si tu estructura es diferente, ajusta la ruta.
const {
    GetAllOffers,
    GetOffert,
    CreateOffert,
    RemoveOffer
} = require("../ofertas");

// GET
router.get("/", async (req, res) => {
    const filterStatus = req.query.status; 
    const filterOrder = req.query.order;
    const filterSearch = req.query.search;

    let querySQL = 'SELECT * FROM offers';
    let parameters = [];

    if (filterStatus) {
        querySQL += ' WHERE estado = $1'; 
        parameters.push(filterStatus);
    }

    if (filterSearch) {
        const paramIndex = parameters.length + 1;
        if (parameters.length > 0) {
            querySQL += ` AND (title ILIKE $${paramIndex} OR descripcion ILIKE $${paramIndex})`;
        } else {
            querySQL += ` WHERE (title ILIKE $${paramIndex} OR descripcion ILIKE $${paramIndex})`;
        }
        parameters.push(`%${filterSearch}%`);
    }

    let sortDirection = 'DESC'; 
    if (filterOrder && filterOrder.toUpperCase() === 'ASC') {
        sortDirection = 'ASC';
    }
    querySQL += ` ORDER BY creation_date ${sortDirection}`;

    try {
        const result = await GetAllOffers(querySQL, parameters);
        if (result) {
            res.json(result);
        } else {
            res.status(500).send("No se pudo obtener datos");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
});

// POST
router.post("/", async (req, res) => {
    if (!req.body) return res.status(400).send("No body provided");
    const { 
        offer_type, title, descripcion, images_urls, mount, 
        auctioneer_id, bidder_id, auction_id 
    } = req.body;

    try {
        const newOffer = await CreateOffert(
            offer_type, title, descripcion, images_urls || [], mount, 
            auctioneer_id, bidder_id, auction_id
        );
        res.status(201).json(newOffer);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creando oferta");
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    const deleted = await RemoveOffer(req.params.id);
    if (deleted) res.json({ message: "Eliminado" });
    else res.status(404).send("No encontrado");
});

// --- ESTO ES OBLIGATORIO PARA QUE NODE.JS ARRANQUE ---
module.exports = router;
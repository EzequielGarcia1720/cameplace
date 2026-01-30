const express = require('express');
const router = express.Router();
const {
    GetAllOffers,
    GetOffert,
    CreateOffert,
    RemoveOffer,
    GetOffersByAuction,
} = require("../ofertas");

// GET /api/v1/offers
router.get("/", async (req, res) => {
    // Filtros de consulta
    const filterStatus = req.query.status; 
    const filterOrder = req.query.order;
    const filterSearch = req.query.search;

    // Construir la consulta SQL con filtros
    let querySQL = 'SELECT * FROM offers';
    let parameters = [];
    
    // Aplicar filtros si existen
    if (filterStatus) {
        querySQL += ' WHERE estado = $1'; 
        parameters.push(filterStatus);
    }

    // Filtro de búsqueda en título y descripción
    if (filterSearch) {
        const paramIndex = parameters.length + 1;
        if (parameters.length > 0) {
            querySQL += ` AND (title ILIKE $${paramIndex} OR descripcion ILIKE $${paramIndex})`;
        } else {
            querySQL += ` WHERE (title ILIKE $${paramIndex} OR descripcion ILIKE $${paramIndex})`;
        }
        parameters.push(`%${filterSearch}%`);
    }

    // Ordenar resultados
    let sortDirection = 'DESC'; 
    if (filterOrder && filterOrder.toUpperCase() === 'ASC') {
        sortDirection = 'ASC';
    }
    querySQL += ` ORDER BY creation_date ${sortDirection}`;
    
    // Ejecutar la consulta
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

// POST /api/v1/offers
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

// DELETE /api/v1/offers/:id
router.delete("/:id", async (req, res) => {
    const deleted = await RemoveOffer(req.params.id);
    if (deleted) res.json({ message: "Eliminado" });
    else res.status(404).send("No encontrado");
});

// GET /api/v1/offers/:by_auction
router.get("/:by_auction", async (req, res) => {
    const offers = await GetOffersByAuction(req.params.by_auction);
    res.json(offers);
});

// Exportar el router
module.exports = router;
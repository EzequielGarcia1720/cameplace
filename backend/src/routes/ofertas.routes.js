const express = require('express');
const router = express.Router();
const {
    GetOffer,
    GetAllOffers,
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
    // Validar que se haya proporcionado un cuerpo
    if (req.body === undefined)
        return res.status(400).send("No body was provided");
    
    // Extraer los campos del cuerpo de la solicitud
    const offer_type = req.body.offer_type;
    const title = req.body.title;
    const descripcion = req.body.descripcion;
    const images_urls = req.body.images_urls;
    const mount = req.body.mount;
    const auctioneer_id = req.body.auctioneer_id;
    const bidder_id = req.body.bidder_id;
    const auction_id = req.body.auction_id;
    const estado = req.body.estado

    // Validaciones mínimas: solo los campos realmente obligatorios
    if (offer_type === undefined || offer_type === null)
        return res.status(400).send("Type of offer not provided");
    if (title === undefined || title === null)
        return res.status(400).send("Title not provided");
    if (descripcion === undefined || descripcion === null)
        return res.status(400).send("Descripcion not provided");
    if (mount === undefined || mount === null)
        return res.status(400).send("Mount not provided");
    if (auctioneer_id === undefined || auctioneer_id === null)
        return res.status(400).send("Auctioneer ID not provided");
    if (bidder_id === undefined || bidder_id === null)
        return res.status(400).send("Bidder ID not provided");
    if (auction_id === undefined || auction_id === null)
        return res.status(400).send("Auction ID not provided");
    // images_urls y estado pueden ser string vacío
    // Si no vienen, poner string vacío por defecto
    const safe_images_urls = images_urls !== undefined && images_urls !== null ? images_urls : "";
    const safe_estado = estado !== undefined && estado !== null ? estado : "Activa";

    // Crear la oferta
    const offert = await CreateOffert(offer_type, title, descripcion, safe_images_urls, mount, auctioneer_id, bidder_id, auction_id, safe_estado)
    // Verificar si la creación fue exitosa
    if (offert === undefined)
        res.sendStatus(500);
    res.status(201).json(offert);
});

// DELETE /api/v1/offers/:id
router.delete("/:id", async (req, res) => {
    // Verificar si la oferta existe
    const offert = await GetOffer(req.params.id);

    // Si no existe, devolver 404
    if (offert === undefined)
        return res.sendStatus(404);

    // Intentar eliminar la oferta
    if (!(await RemoveOffer(req.params.id))) {
        return res.sendStatus(500);
    }
    return res.json(offert);
});

router.get("/:id", async (req, res) => {
    const offers = await GetOffersByAuction(req.params.id);
    if (offers === undefined)
        return res.sendStatus(404)
    res.json(offers);
});


// Exportar el router
module.exports = router;
// OFERTAS ROUTES
// Definimos las rutas para manejar las ofertas
const express = require('express');
const router = express.Router();
const {
    GetAllOffers,
    GetOffert,
    CreateOffert,
    RemoveOffer
} = require("../ofertas");

// GET /api/v1/offers
router.get("/", async (req, res) => {
    const filterStatus = req.query.status; 
    const filterOrder = req.query.order; // Esperamos 'ASC' o 'DESC'

    let querySQL = 'SELECT * FROM offers';
    let parameters = [];

    //LÓGICA DE FILTRADO (WHERE)
    if (filterStatus) {
        querySQL += ' WHERE estado = $1'; 
        parameters.push(filterStatus);
    }

    // LÓGICA DE ORDENAMIENTO (ORDER BY)
    // Definimos un valor por defecto (DESC = más reciente primero)
    let sortDirection = 'DESC'; 

    // Si el usuario envió algo, verificamos si es 'ASC', si no, se queda en 'DESC'
    if (filterOrder && filterOrder.toUpperCase() === 'ASC') {
        sortDirection = 'ASC';
    }

    // Dejar un espacio al inicio de " ORDER BY"
    querySQL += ` ORDER BY creation_date ${sortDirection}`;

    try {
        
        const result = await GetAllOffers(querySQL, parameters);
        if (result) {
            res.json(result);
        } else {
            res.status(500).send("No se pudo obtener datos");
        }
    } catch (err) {
        console.error("Error en el endpoint:", err);
        res.status(500).send("Error de servidor");
    }
});


//POST. /api/v1/offers
router.post("/", async (req, res) => {
    // Validar que se haya proporcionado un cuerpo
    if (req.body === undefined)
        return res.status(400).send("No body was provided");
    
    // Extraer los campos del cuerpo de la solicitud
    const id = req.body.id;
    const type_offert = req.body.type_offert;
    const title = req.body.title;
    const description = req.body.description;
    const images_urls = req.body.images_urls;
    const amount = req.body.amount;
    const auctioneer_id = req.body.auctioneer_id;
    const bidder_id = req.body.bidder_id;
    const auction_id = req.body.auction_id;
    const creation_date = req.body.creation_date;

    // Validaciones
    if (id === undefined)
        return res.status(400).send("Number not provided");
    if (await GetAuction(id) !== undefined)
        return res.status(409).send("The auction already exists");
    if (type_offert === undefined) 
        return res.status(400).send("Type of offer not provided");
    if (title === undefined) 
        return res.status(400).send("Title not provided");
    if (description === undefined) 
        return res.status(400).send("Description not provided");
    if (amount === undefined) 
        return res.status(400).send("Amount not provided");
    if (auctioneer_id === undefined) 
        return res.status(400).send("Auctioneer ID not provided");
    if (bidder_id === undefined) 
        return res.status(400).send("Bidder ID not provided");
    if (auction_id === undefined) 
        return res.status(400).send("Auction ID not provided");
    if (creation_date === undefined) 
        return res.status(400).send("Creation date not provided");

    // Crear la oferta
    const offert = await CreateOffert(id, title, description, amount, auctioneer_id, bidder_id, auction_id, creation_date);
    // Verificar si la creación fue exitosa
    if (offert === undefined)
        res.sendStatus(500);
    res.status(201).json(offert);
});

//DELETE. /api/v1/offers/:id
router.delete("/:id", async (req, res) => {
    // Verificar si la oferta existe
    const offert = await GetOffert(req.params.id);

    // Si no existe, devolver 404
    if (offert === undefined)
        return res.sendStatus(404);

    // Intentar eliminar la oferta
    if (!(await RemoveOffer(req.params.id))) {
        return res.sendStatus(500);
    }
    return res.json(offert);
});
// Exportar el router
module.exports = router;
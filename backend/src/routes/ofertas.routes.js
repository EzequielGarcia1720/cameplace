// OFERTAS ROUTES
const express = require('express');
const router = express.Router();
const {
    GetAllOffers,
    GetOffert,
    CreateOffert,
    RemoveOffer
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

//POST. /api/v1/offers
router.post("/", async (req, res) => {
    if (req.body === undefined)
        return res.status(400).send("No body was provided");
    
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

    const offert = await CreateOffert(id, title, description, amount, auctioneer_id, bidder_id, auction_id, creation_date);
    
    if (offert === undefined)
        res.sendStatus(500);
    res.status(201).json(offert);
});

//DELETE. /api/v1/offers/:id
router.delete("/:id", async (req, res) => {
    const offert = await GetOffert(req.params.id);
    if (offert === undefined)
        return res.sendStatus(404);
    if (!(await RemoveOffer(req.params.id))) {
        return res.sendStatus(500);
    }
    return res.json(offert);
});
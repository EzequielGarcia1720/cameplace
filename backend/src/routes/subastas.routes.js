const express = require('express');
const router = express.Router();
const {
    GetAllAuctions, 
    GetAuction, 
    CreateAuction, 
    RemoveAuction, 
    UpdateAuction 
} = require("../subastas");

// GET /api/v1/auctions
router.get("/", async (req, res) => {
    try {
        // Obtener el parámetro de consulta 'status' si está presente
        const filterStatus = req.query.status; 
        const filterSearch = req.query.search;
        //FILTRO
        // const filterTypeOffer = req.query.type_offer;
        // const filterCategory = req.query.category;
        // Llamamos a la función pasándole el filtro directamente
        const auctions = await GetAllAuctions(filterStatus, filterSearch);
        
        res.json(auctions);
    } catch (error) {
        console.error("Error al obtener subastas:", error);
        res.sendStatus(500);
    }
});

// GET /api/v1/auctions/:id
router.get("/:id", async (req, res) => {
    const auction = await GetAuction(req.params.id);
    if (auction === undefined) {
        res.sendStatus(404);
    }
    res.json(auction);
});

// POST /api/v1/auctions
router.post("/", async (req, res) => {
    if (req.body === undefined)
        return res.status(400).send("No body was provided");
    
    const id = req.body.id;
    const title = req.body.title;
    const descripcion = req.body.descripcion;
    const initial_price = req.body.initial_price;
    const category_id = req.body.category_id;
    const condition = req.body.condition;
    const images_urls = req.body.images_urls;
    const auctioneer_id = req.body.auctioneer_id;
    const offer_type = req.body.offer_type;
    const auction_status = req.body.auction_status;
    const location_id = req.body.location_id;
    
    if (id === undefined)
        return res.status(400).send("Number not provided");
    if (await GetAuction(id) !== undefined)
        return res.status(409).send("The auction already exists");
    if (title === undefined) 
        return res.status(400).send("Title not provided");
    if (descripcion === undefined) 
        return res.status(400).send("Description not provided");
    if (initial_price === undefined) 
        return res.status(400).send("Inicial price not provided");
    if (category_id === undefined) 
        return res.status(400).send("Category ID not provided");
    if (condition === undefined) 
        return res.status(400).send("Condition not provided");
    if (images_urls === undefined) 
        return res.status(400).send("Image not provided");
    if (auctioneer_id === undefined) 
        return res.status(400).send("Auctioneer ID not provided");
    if (offer_type === undefined) 
        return res.status(400).send("Offer type not provided");
    if (auction_status === undefined) 
        return res.status(400).send("Auction status not provided");
    if (location_id === undefined) 
        return res.status(400).send("Location ID not provided");

    const auction = await CreateAuction(id, title, descripcion, initial_price, category_id, condition, images_urls, auctioneer_id, offer_type, auction_status, location_id);
    
    if (auction === undefined)
        res.sendStatus(500);
    res.status(201).json(auction);
});

// DELETE /api/v1/auctions/:id
router.delete("/:id", async (req, res) => {
    const auction = await GetAuction(req.params.id);
    if (auction === undefined)
        return res.sendStatus(404);
    if (!(await RemoveAuction(req.params.id))) {
        return res.sendStatus(500);
    }
    return res.json(auction);
});

// PUT /api/v1/auctions/:id
router.put("/:id", async (req, res) => {
    let auction = await GetAuction(req.params.id);
    if (auction === undefined)
        return res.status(404).send("The auction not exists");

    if (req.body === undefined)
        return res.status(400).send("No body was provided");

    const title = req.body.title;
    const descripcion = req.body.descripcion;
    const initial_price = req.body.initial_price;
    const category_id = req.body.category_id;
    const condition = req.body.condition;
    const images_urls = req.body.images_urls;
    const auctioneer_id = req.body.auctioneer_id;
    const offer_type = req.body.offer_type;
    const auction_status = req.body.auction_status;
    const location_id = req.body.location_id;

    if (title === undefined) 
        return res.status(400).send("Title not provided");
    if (descripcion === undefined) 
        return res.status(400).send("Description not provided");
    if (initial_price === undefined) 
        return res.status(400).send("Inicial price not provided");
    if (category_id === undefined) 
        return res.status(400).send("Category ID not provided");
    if (condition === undefined) 
        return res.status(400).send("Condition not provided");
    if (images_urls === undefined) 
        return res.status(400).send("Image not provided");
    if (auctioneer_id === undefined) 
        return res.status(400).send("Auctioneer ID not provided");
    if (offer_type === undefined) 
        return res.status(400).send("Offer type not provided");
    if (auction_status === undefined) 
        return res.status(400).send("Auction status not provided");
    if (location_id === undefined) 
        return res.status(400).send("Location ID not provided");
    
    auction = await UpdateAuction(req.params.id, title, descripcion, initial_price, category_id, condition, images_urls, auctioneer_id, offer_type, auction_status, location_id);

    res.json(auction);
});

module.exports = router;
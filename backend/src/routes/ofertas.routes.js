// OFERTAS ROUTES
// Definimos las rutas para manejar las ofertas
const express = require('express');
const router = express.Router();
const {
    GetAllOffers,
    CreateOffert,
    RemoveOffer,
    GetOffersByAuction,
} = require("../ofertas");

// GET /api/v1/offers
router.get("/", async (req, res) => {
    const filterStatus = req.query.status; // Esperamos 'activas', 'aceptadas', 'rechazadas', 'finalizadas'
    const filterOrder = req.query.order; // Esperamos 'ASC' o 'DESC'
    const filterSearch = req.query.search; // Esperamos un texto para buscar en título y descripción
   
    let querySQL = 'SELECT * FROM offers';
    let parameters = [];

    //LÓGICA DE ESTADO (WHERE)
    // ejemplo: /api/v1/offers?status=activas
    if (filterStatus) {
        querySQL += ' WHERE estado = $1'; 
        parameters.push(filterStatus); //pushea el valor del filtro al array de parámetros
    }


    // LÓGICA DE ORDENAMIENTO (ORDER BY)
    // Definimos un valor por defecto (DESC = más reciente primero)
    //ejemplo: /api/v1/offers?order=ASC
    let sortDirection = 'DESC'; 
    
    // Si el usuario envió algo, verificamos si es 'ASC', si no, se queda en 'DESC'
    if (filterOrder && filterOrder.toUpperCase() === 'ASC') {
        sortDirection = 'ASC';
    }

    
    // LÓGICA DE BÚSQUEDA (SEARCH)
    // ejemplo: /api/v1/offers?search=telefono
    if (filterSearch) {
        // Calculamos la posición del parámetro (si ya hay uno, este será $2, si no, $1)
        const paramIndex = parameters.length + 1; 
        
        // Si el array de parámetros tiene algo, significa que ya pusimos un WHERE antes
        if (parameters.length > 0) {
            querySQL += ` AND (title ILIKE $${paramIndex} OR descripcion ILIKE $${paramIndex})`;
        } else {
            // Si está vacío, somos el primer filtro, así que ponemos WHERE
            querySQL += ` WHERE (title ILIKE $${paramIndex} OR descripcion ILIKE $${paramIndex})`;
        }
        
        // Agregamos la palabra clave con los % para que funcione el ILIKE
        parameters.push(`%${filterSearch}%`);
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

/*router.get("/:id", async (req, res) => {
    const offers = await GetOffer(req.params.id);
    if (offers === undefined)
        return sendStatus(404)
    res.json(offers);
});*/


//POST. /api/v1/offers
router.post("/", async (req, res) => {
    // Validar que se haya proporcionado un cuerpo
    if (req.body === undefined)
        return res.status(400).send("No body was provided");
    
    // Extraer los campos del cuerpo de la solicitud
    const id = req.body.id;
    const offer_type = req.body.offer_type;
    const title = req.body.title;
    const descripcion = req.body.descripcion;
    const images_urls = req.body.images_urls;
    const mount = req.body.mount;
    const auctioneer_id = req.body.auctioneer_id;
    const bidder_id = req.body.bidder_id;
    const auction_id = req.body.auction_id;
    const estado = req.body.estado

    // Validaciones
    if (id === undefined)
        return res.status(400).send("Number not provided");
    if (await GetOffert(id) !== undefined)
        return res.status(409).send("The auction already exists");
    if (offer_type === undefined) 
        return res.status(400).send("Type of offer not provided");
    if (title === undefined) 
        return res.status(400).send("Title not provided");
    if (descripcion === undefined) 
        return res.status(400).send("Descripcion not provided");
    if (mount === undefined) 
        return res.status(400).send("Mount not provided");
    if (auctioneer_id === undefined) 
        return res.status(400).send("Auctioneer ID not provided");
    if (bidder_id === undefined) 
        return res.status(400).send("Bidder ID not provided");
    if (auction_id === undefined) 
        return res.status(400).send("Auction ID not provided");
    if (images_urls === undefined)
        return res.status(400).send("Image not provided")
    if (estado === undefined)
        return res.status(400).send("State not provided")

    // Crear la oferta
    const offert = await CreateOffert(id, offer_type, title, descripcion, images_urls, mount, auctioneer_id, bidder_id, auction_id, estado)
    // Verificar si la creación fue exitosa
    if (offert === undefined)
        res.sendStatus(500);
    res.status(201).json(offert);
});

//DELETE. /api/v1/offers/:id
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
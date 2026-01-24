const express = require('express');
//Funciones importadas
const { 
    getAllUsers,
    getUser,
    newUser,
    updateUser,
    deleteUser
} = require('./usuarios');
const {
    GetAllAuctions, 
    GetAuction, 
    CreateAuction, 
    RemoveAuction, 
    UpdateAuction 
} = require("./subastas");

const app = express();
const port = 3030;
app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

//Rutass
//USERS - USER

//GET
app.get("/api/v1/users", async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
});

app.get("/api/v1/users/:id", async (req, res) => {
    const user = await getUser(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "Usuario no encontrado" });
    }
});

//POST
app.post("/api/v1/users", async (req, res) => {
    const { username, psswd, email, firstname, lastname, tel, biography, image_url, ubication } = req.body;
    try {
        await newUser(username, psswd, email, firstname, lastname, tel, biography, image_url, ubication);
        res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        const status = (error && error.status) ? error.status : 500;
        const message = (error && error.message) ? error.message : 'Error al crear el usuario';
        res.status(status).json({ error: message });
    }
});

//PUT
app.put("/api/v1/users/:id", async (req, res) => {
    const userID = req.params.id;
    const { username, firstname, lastname, biography } = req.body;
    try {
        const updatedUser = await updateUser(userID, username, firstname, lastname, biography);
        if (!updatedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(updatedUser);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
});


//DELETE
app.delete("/api/v1/users/:id", async (req, res) => {
    const userID = req.params.id;

    try {
        const deletedUser = await deleteUser(userID); 
        if (!deletedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(deletedUser)
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
});

// SUBASTAS

// GET. /subastas
app.get("/api/v1/auctions", async (req, res) => {
    const auctions = await GetAllAuctions();
    res.json(auctions);
});
// GET. /subastas/<num>
app.get("/api/v1/auctions/:id", async (req, res) => {
    const auction = await GetAuction(req.params.id);
    if (auction === undefined) {
        res.sendStatus(404);
    }
    res.json(auction);
});
// POST ./subastas
app.post("/api/v1/auctions", async (req, res) => {
    if (req.body === undefined)
        return sendStatus(400).send("No body was provided")
    const id = req.body.id
    const title = req.body.title
    const descripcion = req.body.descripcion
    const initial_price = req.body.initial_price
    const category_id = req.body.category_id
    const condition = req.body.condition
    const images_urls = req.body.images_urls
    const auctioneer_id = req.body.auctioneer_id
    const offer_type = req.body.offer_type
    const auction_status = req.body.auction_status
    const location_id = req.body.location_id
    
    if (id === undefined)
        return res.status(400).send("Number not provided")
    if (await GetAuction(id) !== undefined)
        return res.status(409).send("The auction already exists")
    if (title === undefined) 
        return res.status(400).send("Title not provided")
    if (descripcion === undefined) 
        return res.status(400).send("Description not provided")
    if (initial_price === undefined) 
        return res.status(400).send("Inicial price not provided")
    if (category_id === undefined) 
        return res.status(400).send("Category ID not provided")
    if (condition === undefined) 
        return res.status(400).send("Condition not provided")
    if (images_urls === undefined) 
        return res.status(400).send("Image not provided")
    if (auctioneer_id === undefined) 
        return res.status(400).send("Auctioneer ID not provided")
    if (offer_type === undefined) 
        return res.status(400).send("Offer type not provided")
    if (auction_status === undefined) 
        return res.status(400).send("Auction status not provided")
    if (location_id === undefined) 
        return res.status(400).send("Location ID not provided")

    const auction = await CreateAuction(id, title, descripcion, initial_price, category_id, condition, images_urls, auctioneer_id, offer_type, auction_status, location_id)
    
    if (auction === undefined)
        res.sendStatus(500);
    res.status(201).json(auction)
});
// DELETE. /subastas/<num>
app.delete("/api/v1/auctions/:id", async (req, res) => {
    const auction = await GetAuction(req.params.id)
    if (auction === undefined)
        return res.sendStatus(404);
    if (!(await RemoveAuction(req.params.id))) {
        return res.sendStatus(500)
    }
    return res.json(auction);
});
// PUT. /subastas/<num>
app.put("/api/v1/auctions/:id", async (req, res) => {
    let auction = await GetAuction(req.params.id);
    if (auction === undefined)
        return res.sendStatus(404).send("The auction not exists")

    if (req.body === undefined)
        return sendStatus(400).send("No body was provided")

    const title = req.body.title
    const descripcion = req.body.descripcion
    const initial_price = req.body.initial_price
    const category_id = req.body.category_id
    const condition = req.body.condition
    const images_urls = req.body.images_urls
    const auctioneer_id = req.body.auctioneer_id
    const offer_type = req.body.offer_type
    const auction_status = req.body.auction_status
    const location_id = req.body.location_id

    
    if (title === undefined) 
        return res.status(400).send("Title not provided")
    if (descripcion === undefined) 
        return res.status(400).send("Description not provided")
    if (initial_price === undefined) 
        return res.status(400).send("Inicial price not provided")
    if (category_id === undefined) 
        return res.status(400).send("Category ID not provided")
    if (condition === undefined) 
        return res.status(400).send("Condition not provided")
    if (images_urls === undefined) 
        return res.status(400).send("Image not provided")
    if (auctioneer_id === undefined) 
        return res.status(400).send("Auctioneer ID not provided")
    if (offer_type === undefined) 
        return res.status(400).send("Offer type not provided")
    if (auction_status === undefined) 
        return res.status(400).send("Auction status not provided")
    if (location_id === undefined) 
        return res.status(400).send("Location ID not provided")
    
    auction = await UpdateAuction(req.params.id, title, descripcion, initial_price, category_id, condition, images_urls, auctioneer_id, offer_type, auction_status, location_id)

    res.json(auction)

});
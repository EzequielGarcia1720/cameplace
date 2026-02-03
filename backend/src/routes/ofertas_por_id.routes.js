const express = require('express');
const router = express.Router();
const {
    GetOffer,
    UpdateStateOfTheOffer
} = require("../ofertas");

// Obtengo los datos de la oferta cuando veo las ofertas de tal subasta
router.get("/:id", async (req, res) => {
    const offers = await GetOffer(req.params.id);
    if (offers === undefined)
        return res.sendStatus(404)
    res.json(offers);
});
// Actualiza el estado de la oferta cuando se acepta
router.patch("/:id", async (req, res) => {
    let offers = await GetOffer(req.params.id);
    if (offers === undefined)
        return res.status(404).send("The offer not exists");

    if (req.body === undefined)
        return res.status(400).send("No body was provided");

    const offer_status = req.body.offer_status
    
    if (offer_status === undefined) 
        return res.status(400).send("State not provided");
    
    UpdateState = await UpdateStateOfTheOffer(req.params.id)
    res.json(UpdateState);
});
module.exports = router;
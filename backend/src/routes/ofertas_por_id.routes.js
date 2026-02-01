const express = require('express');
const router = express.Router();
const {
    GetOffer,
    UpdateStateOfTheOffer
} = require("../ofertas");

router.get("/:id", async (req, res) => {
    const offers = await GetOffer(req.params.id);
    if (offers === undefined)
        return res.sendStatus(404)
    res.json(offers);
});

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
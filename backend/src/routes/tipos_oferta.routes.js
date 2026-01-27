const express = require('express');
const router = express.Router();

const { 
    GetAllOffersType
} = require('../offers_type');
router.get("/", async (req, res) => {
    const offers_type = await GetAllOffersType();
    res.json(offers_type);
});

module.exports = router;


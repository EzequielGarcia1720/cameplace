const express = require('express');
const router = express.Router();


router.get("/", async (req, res) => {
    const categories = await GetAllCategories();
    res.json(categories);
});
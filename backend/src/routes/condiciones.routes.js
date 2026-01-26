const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
    const conditions = await GetAllConditions();
    res.json(conditions);
});
module.exports = router;
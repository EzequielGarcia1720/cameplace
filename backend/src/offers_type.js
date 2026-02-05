const dbClient = require("./db");

async function GetAllOffersType() {
    const result = await dbClient.query("SELECT * FROM offer_type")
    return result.rows
}

module.exports = {
    GetAllOffersType,
}
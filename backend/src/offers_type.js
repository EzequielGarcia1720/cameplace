const { Pool } = require("pg");

const dbClient = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "cameplace"
});

async function GetAllOffersType() {
    const result = await dbClient.query("SELECT * FROM offer_type")
    return result.rows
}

module.exports = {
    GetAllOffersType,
}
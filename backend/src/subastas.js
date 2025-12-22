const { Pool } = require("pg");

const dbClient = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "cameplace"
});

//GetAllAuctions
async function getAllAuctions() {
    const response = await dbClient.query("SELECT * FROM auctions");
    return response.rows; 
}

module.exports = {
    getAllAuctions
}
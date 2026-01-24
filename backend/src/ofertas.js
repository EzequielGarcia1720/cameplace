const { Pool } = require("pg");

const dbClient = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "cameplace"
});

// bids
async function DeletedBid(id) {
    try {
        const result = await dbClient.query("DELETE FROM bids where id = $1", [id])
        return result.rowCount === 1;
    } catch {
        return false
    }
}

async function GetAllBids() {
    const response = await dbClient.query("SELECT * FROM bids")
    return response.rows
}

module.exports = {
    DeletedBid,
    GetAllBids
}
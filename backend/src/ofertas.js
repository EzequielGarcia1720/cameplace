const { Pool } = require("pg");

const dbClient = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "cameplace"
});

async function GetAllOffers(querySQL, parameters) {

    try {
        const response = dbClient.query(querySQL, parameters)
        return response.rows
    } catch {
        return false
    }
}



module.exports = {
    GetAllOffers,
}
const { Pool } = require("pg");

const dbClient = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "cameplace"
});

async function GetAllConditions() {
    const result = await dbClient.query("SELECT * FROM condition")
    return result.rows
}

module.exports = {
    GetAllConditions,
}
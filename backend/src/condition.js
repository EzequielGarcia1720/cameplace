const dbClient = require("./db");

async function GetAllConditions() {
    const result = await dbClient.query("SELECT * FROM condition")
    return result.rows
}

module.exports = {
    GetAllConditions,
}
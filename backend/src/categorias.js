const dbClient = require("./db");

async function GetAllCategories() {
    const result = await dbClient.query("SELECT * FROM categories");
    return result.rows;
}

module.exports = {
    GetAllCategories,
}
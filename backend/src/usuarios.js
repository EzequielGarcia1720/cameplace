const { Pool } = require("pg");

const dbClient = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "cameplace"
});



async function getAllUsers() {
    const response = await dbClient.query("SELECT * FROM users");
    return response.rows; // ✅ Retorna los resultados
}

async function getUser(id) {
    const response = await dbClient.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    );

    if (response.rowCount === 0) {
        return undefined;
    }

    return response.rows[0]; 
};


module.exports = {
    getAllUsers,
    getUser
};
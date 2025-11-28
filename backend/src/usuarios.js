const { Pool } = require("pg");

const dbClient = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "cameplace"
});


//GetAllUsers
async function getAllUsers() {
    const response = await dbClient.query("SELECT * FROM users");
    return response.rows; // ✅ Retorna los resultados
}

//GetUser
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

//NewUser
async function newUser(username,psswd,email,firstname,lastname,tel,ubication) {
    const reponse = await dbClient.query(
        "INSERT INTO users (username,psswd,email,firstname,lastname,tel,ubication) VALUES ($1,$2,$3,$4,$5,$6,$7)",
        [username,psswd,email,firstname,lastname,tel,ubication]
    )
    return {
        username,
        psswd,
        email,
        firstname,
        lastname,
        tel,
        ubication
    }
};

module.exports = {
    getAllUsers,
    getUser,
    newUser

};
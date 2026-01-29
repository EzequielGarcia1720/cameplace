const { Pool } = require("pg");

const dbClient = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "cameplace"
});

//Verificar si el usuario existe
async function checkEmailExists(email) {
    const res = await dbClient.query(
        'SELECT 1 FROM users WHERE email = $1',
        [email]
    );
    return res.rowCount > 0;
}

//GetUserID
async function getUserID(email) {
    const response = await dbClient.query(
        "SELECT id from users where email = $1",
        [email]
    )
    return response.rows[0];
}


//GetAllUsers
async function getAllUsers() {
    const response = await dbClient.query("SELECT * FROM users");
    return response.rows; 
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
async function newUser(username, psswd, email, firstname, lastname, tel, biography, image_url, ubication) {
    if (await checkEmailExists(email)) {
        const err = new Error('Email already in use');
        err.status = 409;
        throw err;
    }

    const response = await dbClient.query(
        'INSERT INTO users (username, psswd, email, firstname, lastname, tel, biography, image_url, ubication) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
        [username, psswd, email, firstname, lastname, tel, biography, image_url, ubication]
    );

    return response.rows[0];
};


//UpdateUser
async function updateUser(userID, username, firstname, lastname, biography) {
    // Obtener el usuario actual
    const currentUser = await getUser(userID);
    if (!currentUser) {
        const err = new Error('Usuario no encontrado');
        err.status = 404;
        throw err;
    }

    // Si el username cambia, verificar que no exista en otro usuario
    if (username && username !== currentUser.username && await checkUsernameExists(username)) {
        const err = new Error('Username already exists');
        err.status = 409;
        throw err;
    }

    const response = await dbClient.query(
        'UPDATE users SET username = $1, firstname = $2, lastname = $3, biography = $4 WHERE id = $5 RETURNING *',
        [username, firstname, lastname, biography, userID]
    );

    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];
};

async function deleteUser(userID){
    const response = await dbClient.query(
        'DELETE FROM users WHERE id = $1 RETURNING *',
        [userID]
    );
    
    if (response.rowCount === 0) {
        const err = new Error('Usuario no encontrado');
        err.status = 404;
        throw err;
    }
    
    return { message: 'Usuario eliminado', id: userID };
};

//Login User
async function loginUser(email, psswd) {
    const response = await dbClient.query(
        'SELECT id, username, email, image_url FROM users WHERE email = $1 AND psswd = $2',
        [email, psswd]
    );

    if (response.rowCount === 0) {
        const err = new Error('Email o contraseña incorrectos');
        err.status = 401;
        throw err;
    }

    return response.rows[0];
};

module.exports = {
    getAllUsers,
    getUser,
    newUser,
    updateUser,
    deleteUser,
    getUserID,
    loginUser
};
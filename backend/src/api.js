const express = require('express');
//Funciones importadas
const { 
    getAllUsers,
    getUser,
    newUser
} = require('./usuarios.js'); 

const app = express();
const port = 3030;
app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

//Rutass
//USERS - USER

//GET
app.get("/api/v1/users", async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
});

app.get("/api/v1/users/:id", async (req, res) => {
    const user = await getUser(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "Usuario no encontrado" });
    }
});

//POST
app.post("/api/v1/users", async (req, res) => {
    const { username, psswd, email, firstname, lastname, tel, ubication } = req.body;
    try {
        await newUser(username, psswd, email, firstname, lastname, tel, ubication);
        res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
});

//PUT



//DELETE
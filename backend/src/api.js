const express = require('express');
//Funciones importadas
const { 
    getAllUsers,
    getUser 
} = require('./usuarios.js'); 

const app = express();
const port = 3030;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

//Rutass
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

const express = require('express');
//Funciones importadas
const { 
    getAllUsers,
    getUser,
    newUser,
    updateUser,
    deleteUser
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
        const status = (error && error.status) ? error.status : 500;
        const message = (error && error.message) ? error.message : 'Error al crear el usuario';
        res.status(status).json({ error: message });
    }
});

//PUT
app.put("/api/v1/users/:id", async (req, res) => {
    const userID = req.params.id;
    const { username, firstname, lastname, biography } = req.body;
    try {
        const updatedUser = await updateUser(userID, username, firstname, lastname, biography);
        if (!updatedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(updatedUser);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
});


//DELETE
app.delete("/api/v1/users/:id", async (req, res) => {
    const userID = req.params.id;

    try {
        const deletedUser = await deleteUser(userID); 
        if (!deletedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(deletedUser)
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
});
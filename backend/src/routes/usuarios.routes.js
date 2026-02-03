const express = require('express');
const router = express.Router();
const { 
    getAllUsers,
    getUser,
    newUser,
    updateUser,
    deleteUser,
    getUserID,
    loginUser
} = require('../usuarios');

// GET /api/v1/users
router.get("/", async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
});

// GET /api/v1/users/:param (busca por ID o email)
router.get("/:param", async (req, res) => {
    const param = req.params.param;
    let user;
    
    try {
        // Si es un número, buscar por ID; si no, por email
        if (!isNaN(param)) {
            user = await getUser(param);
        } else {
            user = await getUserID(param);
        }
        
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al buscar usuario:", error);
        res.status(500).json({ error: "Error al buscar usuario" });
    }
});


// POST /api/v1/users/login
router.post("/login", async (req, res) => {
    const { email, psswd } = req.body;
    try {
        const user = await loginUser(email, psswd);
        res.json({ message: "Inicio de sesión exitoso", user });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        const status = (error && error.status) ? error.status : 500;
        const message = (error && error.message) ? error.message : 'Error al iniciar sesión';
        res.status(status).json({ error: message });
    }
});

// POST /api/v1/users
router.post("/", async (req, res) => {
    const { username, psswd, email, firstname, lastname, tel, biography, image_url, ubication } = req.body;
    try {
        await newUser(username, psswd, email, firstname, lastname, tel, biography, image_url, ubication);
        res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        const status = (error && error.status) ? error.status : 500;
        const message = (error && error.message) ? error.message : 'Error al crear el usuario';
        res.status(status).json({ error: message });
    }
});

// PUT /api/v1/users/:id
router.put("/:id", async (req, res) => {
    const userID = req.params.id;
    const { username, firstname, lastname, biography, image_url, tel } = req.body;
    try {
        const updatedUser = await updateUser(userID, username, firstname, lastname, biography, image_url, tel);
        if (!updatedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(updatedUser);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
});

// DELETE /api/v1/users/:id
router.delete("/:id", async (req, res) => {
    const userID = req.params.id;
    try {
        const deletedUser = await deleteUser(userID); 
        if (!deletedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(deletedUser);
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: error.message });
    }
});

module.exports = router;
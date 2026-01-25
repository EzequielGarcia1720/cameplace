const express = require('express');

// Importar rutas
const usuariosRoutes = require('./routes/usuarios.routes');
const subastasRoutes = require('./routes/subastas.routes');

const app = express();
const port = 3030;

app.use(express.json());

// Configurar rutas
app.use("/api/v1/users", usuariosRoutes);
app.use("/api/v1/auctions", subastasRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
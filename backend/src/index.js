const express = require('express');
const cors = require('cors');
// Importar rutas
const usuariosRoutes = require('./routes/usuarios.routes');
const subastasRoutes = require('./routes/subastas.routes');
const ofertasRoutes = require('./routes/ofertas.routes');
const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

// Configurar rutas
app.use("/api/v1/users", usuariosRoutes);
app.use("/api/v1/auctions", subastasRoutes);
app.use("/api/v1/offers", ofertasRoutes);
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
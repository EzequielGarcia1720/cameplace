const { Pool } = require("pg");

// Configuración de base de datos
const dbClient = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "cameplace"
});

async function GetAllOffers(querySQL, parameters) {
    try {
        const response = await dbClient.query(querySQL, parameters);
        return response.rows; 
    } catch (err) {
        console.error("Error en GetAllOffers:", err); 
        return undefined;
    }
}

async function GetOffert(id) {
    try {
        const response = await dbClient.query("SELECT * FROM offers WHERE id = $1", [id]);
        return response.rows.length > 0 ? response.rows[0] : undefined;
    } catch (err) {
        console.error("Error en GetOffert:", err);
        return undefined;
    }
}

async function CreateOffert(offer_type, title, descripcion, images_urls, mount, auctioneer_id, bidder_id, auction_id) {
    try {
        const query = `
            INSERT INTO offers 
            (offer_type, title, descripcion, images_urls, mount, auctioneer_id, bidder_id, auction_id) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *
        `;
        const values = [offer_type, title, descripcion, images_urls, mount, auctioneer_id, bidder_id, auction_id];
        const result = await dbClient.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error("Error en CreateOffert:", err);
        throw err;
    }
}

async function RemoveOffer(id) {
    try {
        const result = await dbClient.query("DELETE FROM offers WHERE id = $1", [id]);
        return result.rowCount === 1;
    } catch (err) {
        console.error("Error en RemoveOffer:", err);
        return undefined;
    }
}

// --- ESTA PARTE ES CRÍTICA: SI FALTA ESTO, TUS RUTAS FALLAN ---
module.exports = {
    GetAllOffers,
    GetOffert,
    CreateOffert,
    RemoveOffer
};
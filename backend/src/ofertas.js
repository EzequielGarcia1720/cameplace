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
// Obtener las ofertas de acuerdo a la subasta
async function GetOffersByAuction(id) {
    const querySQL = `
    SELECT 
        o.id AS offer_id,
        o.title AS offer_title,           
        o.descripcion AS offer_description,
        o.mount AS offer_amount,          
        o.images_urls AS offer_images,
        o.creation_date AS offer_date,
        o.estado AS offer_status,
        o.offer_type AS offer_type_id,
        o.auctioneer_id AS id_auctioneer_person,     
        a.id AS auction_original_id,
        a.offer_type AS auction_offer_type,
        u.id AS id_bidder,
        u.username AS bidder,
        u.image_url AS image_user,
        u.firstname AS name_user,
        u.lastname AS lastname_user,
        of.type AS offer_type_auction
        
    FROM offers o 
    LEFT JOIN auctions a ON o.auction_id = a.id 
    LEFT JOIN users u ON o.bidder_id = u.id
    LEFT JOIN offer_type of ON o.offer_type = of.id

    WHERE o.auction_id = $1`

    const response = await dbClient.query(querySQL, [id]);
    return response.rows;
}
// Obtener una oferta por ID
async function GetOffert(id) {
    const response = await dbClient.query(
        "SELECT * FROM offers WHERE id = $1", 
        [id]
    )
    if (response.rows.length === 0)
        return undefined
    return response.rows[0]
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
    RemoveOffer,
    GetOffersByAuction
}

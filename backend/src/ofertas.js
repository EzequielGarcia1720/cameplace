const { Pool } = require("pg");

// Configuración de base de datos
const dbClient = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "cameplace"
});
const OffersByAuction = `
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
    LEFT JOIN offer_type of ON o.offer_type = of.id`

// Obtener todas las ofertas, con opción de filtro
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
    const querySQL = `${OffersByAuction} WHERE o.auction_id = $1`;
    console.log("id recibido:", id)
    const response = await dbClient.query(querySQL, [id]);
    if (response.rows.length === 0)
        return undefined
    return response.rows

}
// Obtener una oferta por ID
async function GetOffer(id) {
    const querySQL = `${OffersByAuction} WHERE o.id = $1` 
    const response = await dbClient.query(querySQL, [id]);
    if (response.rows.length === 0)
        return undefined
    return response.rows[0] 
}

// Mejorar oferta (crear nueva oferta)
async function CreateOffert(id, offer_type, title, descripcion, images_urls, mount, auctioneer_id, bidder_id, auction_id, estado) {
    try {
        const result = await dbClient.query(
            "INSERT INTO offers(id, offer_type, title, descripcion, images_urls, mount, auctioneer_id, bidder_id, auction_id, estado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
            [id, offer_type, title, descripcion, images_urls, mount, auctioneer_id, bidder_id, auction_id, estado]
        )
        if (result.rowCount === 0) {
            return undefined
        }
    } catch (e) {
        console.log(e)
        return undefined
    }

    return {
        id,
        offer_type,
        title,
        descripcion,
        images_urls,
        mount,
        auctioneer_id,
        bidder_id,
        auction_id,
        estado
    }
}

async function RemoveOffer(id) {
    try {
        const result = await dbClient.query("DELETE FROM offers WHERE id = $1", [id])
        return result.rowCount === 1;
    } catch (err) {
        console.error("Error en RemoveOffer:", err);
        return undefined;
    }
}

// Editar estado de una subasta

async function UpdateStateOfTheOffer(id) {

    try {
        QuerySQL = `
        UPDATE offers o SET estado = CASE WHEN o.id = $1 
        THEN 'Aceptada' ELSE 'Finalizada' END 
        FROM auctions a WHERE a.id = o.auction_id 
        AND o.auction_id = (SELECT o.auction_id FROM offers o WHERE o.id = $1);`
        const result = await dbClient.query(QuerySQL,[id])
        if (result.rowCount === 0) {
            return undefined
        }
        return id
        
    } catch {
        return undefined
    }
}

// Exportamos las funciones para usarlas en otras partes de la aplicación
module.exports = {
    GetAllOffers,
    GetOffer,
    CreateOffert,
    RemoveOffer,
    GetOffersByAuction,
    UpdateStateOfTheOffer
}

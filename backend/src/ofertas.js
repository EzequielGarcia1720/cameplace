const { Pool } = require("pg");

const dbClient = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "cameplace"
});
// Obtener todas las ofertas, con opción de filtro
async function GetAllOffers(querySQL, parameters) {
    try {
        const response = dbClient.query(querySQL, parameters)
        return response.rows
    } catch {
        return false
    }
}

// Obtener una oferta por ID
async function GetOffert(id) {
    const response = await dbClient.query(
        "SELECT * FROM ofertas WHERE id = $1", 
        [id]
    )
    if (response.rows.length === 0)
        return undefined
    return response.rows[0]
}

// Mejorar oferta (crear nueva oferta)
async function CreateOffert(id, type_offert, title, description, images_urls, amount, auctioneer_id, bidder_id, auction_id, creation_date) {
    try {
        const result = await dbClient.query(
            "INSERT INTO ofertas(id, type_offert, title, description, images_urls, amount, auctioneer_id, bidder_id, auction_id, creation_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
            [id, type_offert, title, description, images_urls, amount, auctioneer_id, bidder_id, auction_id, creation_date]
        )
        if  (result.rowCount === 0) {
            return undefined
        }
    } catch {
        return undefined
    }

    return {
        id,
        type_offert,
        title,
        description,
        images_urls,
        amount,
        auctioneer_id,
        bidder_id,
        auction_id,
        creation_date
    }
}

// Eliminar una oferta por ID
async function RemoveOffer(id) {
    try {
        const result = await dbClient.query("DELETE FROM ofertas where id = $1", [id])
        return result.rowCount === 1;
    } catch {
        return false
    }
}

// Exportamos las funciones para usarlas en otras partes de la aplicación
module.exports = {
    GetAllOffers,
    GetOffert,
    CreateOffert,
    RemoveOffer
}
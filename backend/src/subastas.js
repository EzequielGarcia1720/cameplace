const { Pool } = require("pg");

const dbClient = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "cameplace"
});

// API
async function GetAllAuctions(status_id = null, filterSearch = null) {
    // 1. Construimos la consulta base  
    let querySQL = `
        SELECT a.*, c.auction_condition, s.status_name, u.* FROM auctions a
        LEFT JOIN condition c ON a.condition = c.id 
        LEFT JOIN status s ON a.auction_status = s.id
        JOIN users u ON a.auctioneer_id = u.id 
    `;

    // Array para los parámetros de la consulta
    let params = [];

    // 2. Agregamos el filtro si se proporcionó status_id
    if (status_id && status_id !== '') {
        querySQL += ' WHERE a.auction_status = $1'; // Usamos $1 para Postgres
        params.push(status_id);
    }
    // Filtro de búsqueda en título y descripción
    if (filterSearch) {
        const paramIndex = params.length + 1;
        if (params.length > 0) {
            querySQL += ` AND (title ILIKE $${paramIndex} OR descripcion ILIKE $${paramIndex})`;
        } else {
            querySQL += ` WHERE (title ILIKE $${paramIndex} OR descripcion ILIKE $${paramIndex})`;
        }
        params.push(`%${filterSearch}%`);
    }
    // 3. Agregamos el ordenamiento
    querySQL += ' ORDER BY a.modification_date DESC';

    // 4. Ejecutamos la consulta
    const response = await dbClient.query(querySQL, params);
    
    return response.rows;
}

async function GetAuction(id) {
    
    // Consulta SQL para obtener la subasta por ID
    const querySQL = `
        SELECT a.*, c.auction_condition, s.status_name, u.username, u.email, u.firstname, u.lastname
        FROM auctions a
        LEFT JOIN condition c ON a.condition = c.id 
        LEFT JOIN status s ON a.auction_status = s.id
        JOIN users u ON a.auctioneer_id = u.id
        WHERE a.id = $1
    `;

    try {
        const response = await dbClient.query(querySQL, [id]);
        
        //
        if (response.rows.length === 0) {
            return undefined;
        }
        
        return response.rows[0];
        
    } catch (error) {
        console.error("Error buscando la subasta individual:", error);
        return undefined;
    }
}

async function CreateAuction(id, title, descripcion, initial_price, category_id, condition, images_urls, auctioneer_id, offer_type, auction_status, location_id) {
    try {
        const result = await dbClient.query(
            "INSERT INTO auctions(id, title, descripcion, initial_price, category_id, condition, images_urls, auctioneer_id, offer_type, auction_status, location_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
            [id, title, descripcion, initial_price, category_id, condition, images_urls, auctioneer_id, offer_type, auction_status, location_id]
        )
        if  (result.rowCount === 0) {
            return undefined
        }
    } catch {
        return undefined
    }

    return {
        id,
        title,
        descripcion,
        initial_price,
        category_id,
        condition,
        images_urls,
        auctioneer_id,
        offer_type,
        auction_status,
        location_id,
    }
}


async function RemoveAuction(id) {
    try {
        const result = await dbClient.query("DELETE FROM auctions where id = $1", [id])
        return result.rowCount === 1;
    } catch {
        return false
    }
}
async function UpdateAuction(id, title, descripcion, initial_price, category_id, condition, images_urls, auctioneer_id, offer_type, auction_status, location_id) {
    try {
        const result = await dbClient.query("UPDATE auctions SET title = $2, descripcion = $3, initial_price = $4, category_id = $5, condition = $6, images_urls = $7, auctioneer_id = $8, offer_type = $9, auction_status = $10, location_id = $11, modification_date = CURRENT_TIMESTAMP AT TIME ZONE 'America/Argentina/Buenos_Aires' WHERE id = $1",
        [id, title, descripcion, initial_price, category_id, condition, images_urls, auctioneer_id, offer_type, auction_status, location_id]
        )
        if (result.rowCount === 0) {
            return undefined
        }
        return {
            title,
            descripcion,
            initial_price,
            category_id,
            condition,
            images_urls,
            auctioneer_id,
            offer_type,
            auction_status,
            location_id,
        }
    } catch {
        return undefined
    }
}


module.exports = {
    GetAllAuctions,
    GetAuction,
    CreateAuction,
    RemoveAuction,
    UpdateAuction,
}
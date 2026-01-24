const { Pool } = require("pg");

const dbClient = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "cameplace"
});

async function GetAllAuctions() {
    const response = await dbClient.query("SELECT * FROM auctions")
    return response.rows
}

async function GetAuction(id) {
    const response = await dbClient.query(
        "SELECT * FROM auctions WHERE id = $1", 
        [id]
    )
    if (response.rows.length === 0)
        return undefined
    return response.rows[0]
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
        const result = await dbClient.query("UPDATE auctions SET title = $2, descripcion = $3, initial_price = $4, category_id = $5, condition = $6, images_urls = $7, auctioneer_id = $8, offer_type = $9, auction_status = $10, location_id = $11, modification_date = CURRENT_TIMESTAMP WHERE id = $1",
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

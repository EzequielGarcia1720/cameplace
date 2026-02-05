const { Pool } = require("pg");

const dbClient = new Pool({
    user: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASSWORD || "password",
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5432,
    database: process.env.DATABASE_NAME || "cameplace"
});

module.exports = dbClient;
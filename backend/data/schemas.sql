CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    psswd VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    tel INT,
    ubication VARCHAR(255) NOT NULL,
    registerdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modificationdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



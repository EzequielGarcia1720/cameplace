-- Users

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

-- Categories

CREATE table categories (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    father_category INT,
    FOREIGN KEY (father_category) REFERENCES categories(id)
);


-- Offer types

CREATE table offer_type (
    id serial PRIMARY KEY,
    type VARCHAR(100) NOT NULL 
);

insert into offer_type (type) values ('producto'), ('dinero'), ('mixto');

-- Auctions

CREATE TABLE auctions (
    id serial PRIMARY KEY,
    title VARCHAR(80) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    initial_price DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    condition VARCHAR(100) NOT NULL,
    images_urls TEXT[],
    auctioneer_id INT NOT NULL,
    FOREIGN KEY (auctioneer_id) REFERENCES users(id),
    offer_type INT NOT NULL,
    FOREIGN KEY (offer_type) REFERENCES offer_type(id),
    auction_status INT NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bids
-- Users

CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    psswd VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    tel INT,
    biography TEXT,
    image_url VARCHAR(255),
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

insert into offer_type (type) values ('Producto'), ('Dinero'), ('Mixto');

-- Auctions

CREATE TABLE auctions (
    id serial PRIMARY KEY,
    title VARCHAR(80) NOT NULL,
    descripcion TEXT,
    initial_price DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    condition INT NOT NULL,
    FOREIGN KEY (condition) REFERENCES condition (id)
    images_urls TEXT,
    auctioneer_id INT NOT NULL,
    FOREIGN KEY (auctioneer_id) REFERENCES users(id),
    offer_type INT NOT NULL,
    FOREIGN KEY (offer_type) REFERENCES offer_type(id),
    auction_status INT,
    FOREIGN KEY (auction_status) REFERENCES status(id)
    location_id INT NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modification_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Offers

CREATE TABLE offers (
    id serial PRIMARY KEY,
    offer_type INT NOT NULL,
    FOREIGN KEY (offer_type) REFERENCES offer_type(id),
    title varchar(80) NOT NULL,
    descripcion TEXT NOT NULL,
    images_urls TEXT NOT NULL,
    mount DECIMAL(10,2) NOT NULL,
    auctioneer_id INT NOT NULL,
    FOREIGN KEY (auctioneer_id) REFERENCES users(id),
    bidder_id INT NOT NULL,
    FOREIGN KEY (auctioneer_id) REFERENCES users(id),
    auction_id INT NOT NULL,
    FOREIGN KEY (auction_id) REFERENCES auctions(id),
    estado VARCHAR(20) DEFAULT 'activas' NOT NULL CHECK (estado IN ('activas', 'aceptadas', 'rechazadas', 'finalizadas')),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE condition (
    id serial PRIMARY KEY,
    auction_condition VARCHAR(100) NOT NULL,

);

CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    status_name VARCHAR(100) NOT NULL
);
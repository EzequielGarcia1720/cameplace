-- Categories
CREATE table categories (
    id serial PRIMARY KEY,
    name_category VARCHAR(200) NOT NULL
);

INSERT INTO categories (name_category) VALUES
('Electrónica, Audio y Video'),
('Computación'),
('Celulares y Telefonía'),
('Electrodomésticos'),
('Hogar y Muebles'),
('Indumentaria y Accesorios / Moda'),
('Deportes y Fitness'),
('Juegos, Juguetes y Bebés'),
('Libros y Revistas'),
('Arte y Antigüedades'),
('Coleccionables y Hobbies'),
('Delicatessen y Vinos'),
('Vehículos'),
('Motos y Otros'),
('Maquinaria y Equipos (Industrial, Construcción, Agrícola)'),
('Inmuebles (Bienes Raíces)'),
('Embarcaciones y Aeronaves'),
('Herramientas'),
('Industrias y Oficinas'),
('Materiales y Residuos'),
('Derechos y Acciones'),
('Agrícola, Rural y Campo'),
('Otros');


-- Offer types
CREATE table offer_type (
    id serial PRIMARY KEY,
    type VARCHAR(100)DEFAULT 'mixto' NOT NULL CHECK (type IN ('Dinero', 'Producto', 'Mixto')) 
);

INSERT INTO offer_type (type) VALUES ('Dinero'), ('Producto'), ('Mixto');


-- Condition of auctions
CREATE TABLE condition (
    id serial PRIMARY KEY,
    auction_condition VARCHAR(100) DEFAULT 'Nuevo' NOT NULL CHECK (auction_condition IN ('Nuevo', 'Usado', 'Reacondicionado'))
);

INSERT INTO condition (auction_condition) VALUES ('Nuevo'), ('Usado'), ('Reacondicionado');


-- Status of auctions
CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    status_name VARCHAR(100) NOT NULL
);

INSERT INTO status (id,status_name) VALUES (0,'Activa'), (1,'Pausada'), (2,'Finalizada');

-- Users
CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    psswd VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    tel INT,
    biography TEXT,
    image_url VARCHAR(255),
    ubication VARCHAR(255),
    registerdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modificationdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Auctions
CREATE TABLE auctions (
    id serial PRIMARY KEY,
    title VARCHAR(80) NOT NULL,
    descripcion TEXT,
    initial_price DECIMAL(10,2) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    condition INT NOT NULL,
    FOREIGN KEY (condition) REFERENCES condition(id),
    images_urls TEXT,
    auctioneer_id INT NOT NULL,
    FOREIGN KEY (auctioneer_id) REFERENCES users(id),
    offer_type INT NOT NULL,
    FOREIGN KEY (offer_type) REFERENCES offer_type(id),
    auction_status INT,
    FOREIGN KEY (auction_status) REFERENCES status(id),
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
    images_urls TEXT,
    mount DECIMAL(10,2) NOT NULL,
    auctioneer_id INT NOT NULL,
    FOREIGN KEY (auctioneer_id) REFERENCES users(id),
    bidder_id INT NOT NULL,
    FOREIGN KEY (bidder_id) REFERENCES users(id),
    auction_id INT NOT NULL,
    FOREIGN KEY (auction_id) REFERENCES auctions(id),
    estado VARCHAR(20) DEFAULT 'Activa' NOT NULL CHECK (estado IN ('Activa', 'Aceptada', 'Finalizada')),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);






-- Datos de ejemplo

INSERT INTO users (username, psswd, email, firstname, lastname, tel, ubication) VALUES
('juan_perez', 'hashed_password_123', 'juan@email.com', 'Juan', 'Pérez', 1122334455, 'Buenos Aires, Argentina'),
('maria_gomez', 'hashed_password_456', 'maria@email.com', 'María', 'Gómez', 1122334466, 'Córdoba, Argentina'),
('carlos_lopez', 'hashed_password_789', 'carlos@email.com', 'Carlos', 'López', 1122334477, 'Mendoza, Argentina'),
('ana_ramirez', 'hashed_password_101', 'ana@email.com', 'Ana', 'Ramírez', 1122334488, 'Rosario, Argentina'),
('luis_martinez', 'hashed_password_202', 'luis@email.com', 'Luis', 'Martínez', 1122334499, 'Salta, Argentina')

ON CONFLICT DO NOTHING;

-- 
INSERT INTO auctions (
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
    creation_date,
    modification_date
) VALUES
(
    'iPhone 15 Pro Max 256GB',
    'iPhone 15 Pro Max en perfecto estado, con todos sus accesorios originales. Incluye cargador, cable y funda de regalo. Comprado hace 3 meses, con garantía oficial Apple vigente.',
    120000.00,
    (SELECT id FROM categories WHERE name_category = 'Celulares y Telefonía' LIMIT 1),
    (SELECT id FROM condition WHERE auction_condition = 'Nuevo' LIMIT 1),
    'https://i.blogs.es/f15f0b/img_2033/650_1200.jpeg',
    (SELECT id FROM users WHERE username = 'juan_perez' LIMIT 1),
    (SELECT id FROM offer_type WHERE type = 'Producto' LIMIT 1),
    (SELECT id FROM status WHERE status_name = 'Activa' LIMIT 1),
    1,
    CURRENT_TIMESTAMP - INTERVAL '5 days',
    CURRENT_TIMESTAMP - INTERVAL '1 day'
),
(
    'PlayStation 5 + 2 Juegos',
    'Consola PlayStation 5 edición digital, con 2 mandos DualSense y juegos Spider-Man 2 y God of War Ragnarök. Perfecto funcionamiento, poco uso.',
    85000.00,
    (SELECT id FROM categories WHERE name_category = 'Electrónica, Audio y Video' LIMIT 1),
    (SELECT id FROM condition WHERE auction_condition = 'Usado' LIMIT 1),
    'https://hips.hearstapps.com/hmg-prod/images/esq240112-digital-ecomm-playstationps5-0305-679133a09328d.jpg?crop=0.509xw:0.763xh;0.262xw,0.0765xh&resize=640:*',
    (SELECT id FROM users WHERE username = 'maria_gomez' LIMIT 1),
    (SELECT id FROM offer_type WHERE type = 'Mixto' LIMIT 1),
    (SELECT id FROM status WHERE status_name = 'Activa' LIMIT 1),
    2,
    CURRENT_TIMESTAMP - INTERVAL '3 days',
    CURRENT_TIMESTAMP
),
(
    'Colección de Videojuegos Retro',
    'Lote de 15 videojuegos retro para diversas consolas. Incluye títulos clásicos de Nintendo, Sega y PlayStation 1. Todos en buen estado, algunos con sus cajas originales.',
    35000.00,
    (SELECT id FROM categories WHERE name_category = 'Juegos, Juguetes y Bebés' LIMIT 1),
    (SELECT id FROM condition WHERE auction_condition = 'Reacondicionado' LIMIT 1),
    'https://i.redd.it/e2i0bz33to061.jpg',
    (SELECT id FROM users WHERE username = 'carlos_lopez' LIMIT 1),
    (SELECT id FROM offer_type WHERE type = 'Producto' LIMIT 1),
    (SELECT id FROM status WHERE status_name = 'Activa' LIMIT 1),
    3,
    CURRENT_TIMESTAMP - INTERVAL '1 day',
    CURRENT_TIMESTAMP
),
(
    'Samsung Galaxy S23 Ultra 512GB',
    'Samsung Galaxy S23 Ultra en excelente estado. Pantalla sin rayones, batería en buen estado. Viene con cargador rápido y funda protectora.',
    95000.00,
    (SELECT id FROM categories WHERE name_category = 'Celulares y Telefonía' LIMIT 1),
    (SELECT id FROM condition WHERE auction_condition = 'Usado' LIMIT 1),
    'https://http2.mlstatic.com/D_NQ_NP_895048-MLU69664239579_052023-O.webp',
    (SELECT id FROM users WHERE username = 'ana_ramirez' LIMIT 1),
    (SELECT id FROM offer_type WHERE type = 'Dinero' LIMIT 1),
    (SELECT id FROM status WHERE status_name = 'Activa' LIMIT 1),
    4,
    CURRENT_TIMESTAMP - INTERVAL '4 days',
    CURRENT_TIMESTAMP - INTERVAL '2 days'
),
(
    'Nintendo Switch OLED',
    'Nintendo Switch modelo OLED, con pantalla de 7 pulgadas y almacenamiento interno de 64GB. Incluye dos juegos: The Legend of Zelda: Breath of the Wild y Mario Kart 8 Deluxe.',
    60000.00,
    (SELECT id FROM categories WHERE name_category = 'Electrónica, Audio y Video' LIMIT 1),
    (SELECT id FROM condition WHERE auction_condition = 'Nuevo' LIMIT 1),
    'https://m.media-amazon.com/images/I/61-PblYntsL._AC_SL1500_.jpg',
    (SELECT id FROM users WHERE username = 'luis_martinez' LIMIT 1),
    (SELECT id FROM offer_type WHERE type = 'Mixto' LIMIT 1),
    (SELECT id FROM status WHERE status_name = 'Activa' LIMIT 1),
    5,
    CURRENT_TIMESTAMP - INTERVAL '2 days',
    CURRENT_TIMESTAMP
),
(
    'Xbox Series X 1TB',
    'Xbox Series X con 1TB de almacenamiento. Incluye un mando inalámbrico y sus cables originales. Estado impecable, apenas usado.',
    75000.00,
    (SELECT id FROM categories WHERE name_category = 'Electrónica, Audio y Video' LIMIT 1),
    (SELECT id FROM condition WHERE auction_condition = 'Usado' LIMIT 1),
    'https://www.cordobadigital.net/wp-content/uploads/2023/11/Xbox-Serie-X-3.webp',
    (SELECT id FROM users WHERE username = 'juan_perez' LIMIT 1),
    (SELECT id FROM offer_type WHERE type = 'Producto' LIMIT 1),
    (SELECT id FROM status WHERE status_name = 'Activa' LIMIT 1),
    6,
    CURRENT_TIMESTAMP - INTERVAL '6 days',
    CURRENT_TIMESTAMP - INTERVAL '3 days'
),
(
    'iPad Pro 11" 2021',
    'iPad Pro de 11 pulgadas, modelo 2021, con 256GB de almacenamiento. Incluye Apple Pencil y funda protectora. En excelente estado.',
    90000.00,
    (SELECT id FROM categories WHERE name_category = 'Electrónica, Audio y Video' LIMIT 1),
    (SELECT id FROM condition WHERE auction_condition = 'Usado' LIMIT 1),
    'https://i5.walmartimages.com/asr/2acfc07e-09b1-4df0-8850-e9ffbac41678.d0e2825da1356ded69ab52c3c68ac05e.jpeg',
    (SELECT id FROM users WHERE username = 'maria_gomez' LIMIT 1),
    (SELECT id FROM offer_type WHERE type = 'Mixto' LIMIT 1),
    (SELECT id FROM status WHERE status_name = 'Activa' LIMIT 1),
    7,
    CURRENT_TIMESTAMP - INTERVAL '3 days',
    CURRENT_TIMESTAMP - INTERVAL '1 day'
),
(
    'Auriculares Sony WH-1000XM4',
    'Auriculares inalámbricos Sony WH-1000XM4 con cancelación de ruido. Estado casi nuevo, con caja y accesorios originales.',
    25000.00,
    (SELECT id FROM categories WHERE name_category = 'Electrónica, Audio y Video' LIMIT 1),
    (SELECT id FROM condition WHERE auction_condition = 'Nuevo' LIMIT 1),
    'https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg',
    (SELECT id FROM users WHERE username = 'carlos_lopez' LIMIT 1),
    (SELECT id FROM offer_type WHERE type = 'Producto' LIMIT 1),
    (SELECT id FROM status WHERE status_name = 'Activa' LIMIT 1),
    8,
    CURRENT_TIMESTAMP - INTERVAL '5 days',
    CURRENT_TIMESTAMP - INTERVAL '2 days'
);

--
INSERT INTO offers (
    offer_type,
    title,
    descripcion,
    images_urls,
    mount,
    auctioneer_id,
    bidder_id,
    auction_id,
    estado,
    creation_date
) VALUES
(
    (SELECT id FROM offer_type WHERE type = 'Dinero' LIMIT 1),
    'Oferta por iPhone',
    'Te ofrezco $110,000 en efectivo por el iPhone',
    '',
    110000.00,
    (SELECT id FROM users WHERE username = 'maria_gomez' LIMIT 1),
    (SELECT id FROM users WHERE username = 'carlos_lopez' LIMIT 1),
    (SELECT id FROM auctions WHERE title LIKE '%iPhone%' LIMIT 1),
    'Aceptada',
    CURRENT_TIMESTAMP - INTERVAL '2 days'
),
(
    (SELECT id FROM offer_type WHERE type = 'Producto' LIMIT 1),
    'Cambio por Xbox Series X',
    'Te ofrezco mi Xbox Series X más $20,000 por la PS5',
    'https://www.digitaltrends.com/tachyon/2023/11/ps5-on-table.jpg?resize=1200%2C720',
    20000.00,
    (SELECT id FROM users WHERE username = 'carlos_lopez' LIMIT 1),
    (SELECT id FROM users WHERE username = 'juan_perez' LIMIT 1),
    (SELECT id FROM auctions WHERE title LIKE '%PlayStation%' LIMIT 1),
    'Activa',
    CURRENT_TIMESTAMP - INTERVAL '1 day'
),
(
    (SELECT id FROM offer_type WHERE type = 'Mixto' LIMIT 1),
    'Oferta por Nintendo Switch',
    'Te ofrezco $50,000 más mi colección de juegos retro por la Nintendo Switch',
    'https://media.istockphoto.com/id/1403098902/es/foto/gamepads-anticuados.jpg?s=612x612&w=0&k=20&c=XdX17uPUYALlol2qLY8EWQAuHrPsvVkY--TngRfJYOI=',
    50000.00,
    (SELECT id FROM users WHERE username = 'ana_ramirez' LIMIT 1),
    (SELECT id FROM users WHERE username = 'luis_martinez' LIMIT 1),
    (SELECT id FROM auctions WHERE title LIKE '%Nintendo Switch%' LIMIT 1),
    'Finalizada',
    CURRENT_TIMESTAMP - INTERVAL '3 days'
),
(
    (SELECT id FROM offer_type WHERE type = 'Dinero' LIMIT 1),
    'Oferta por Samsung Galaxy S23',
    'Te ofrezco $90,000 en efectivo por el Samsung Galaxy S23 Ultra',
    '',
    90000.00,
    (SELECT id FROM users WHERE username = 'luis_martinez' LIMIT 1),
    (SELECT id FROM users WHERE username = 'ana_ramirez' LIMIT 1),
    (SELECT id FROM auctions WHERE title LIKE '%Samsung Galaxy S23%' LIMIT 1),
    'Activa',
    CURRENT_TIMESTAMP - INTERVAL '2 days'
),
(
    (SELECT id FROM offer_type WHERE type = 'Producto' LIMIT 1),
    'Cambio por iPad Pro',
    'Te ofrezco mi tablet Samsung Galaxy Tab S7 por el iPad Pro',
    'https://http2.mlstatic.com/D_669050-MLA88640534447_072025-O.jpg',
    0.00,
    (SELECT id FROM users WHERE username = 'juan_perez' LIMIT 1),
    (SELECT id FROM users WHERE username = 'maria_gomez' LIMIT 1),
    (SELECT id FROM auctions WHERE title LIKE '%iPad Pro%' LIMIT 1),
    'Aceptada',
    CURRENT_TIMESTAMP - INTERVAL '4 days'
),
(
    (SELECT id FROM offer_type WHERE type = 'Producto' LIMIT 1),
    'Cambio por Xbox Series X',
    'Te ofrezco mi Xbox Series X más $20,000 por la PS5',
    'https://www.digitaltrends.com/tachyon/2023/11/ps5-on-table.jpg?resize=1200%2C720',
    20000.00,
    (SELECT id FROM users WHERE username = 'carlos_lopez' LIMIT 1),
    (SELECT id FROM users WHERE username = 'juan_perez' LIMIT 1),
    (SELECT id FROM auctions WHERE title LIKE '%PlayStation%' LIMIT 1),
    'Activas',
    CURRENT_TIMESTAMP - INTERVAL '1 day'
);
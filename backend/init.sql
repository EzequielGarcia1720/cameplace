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

INSERT INTO status (status_name) VALUES ('Activa'), ('Pausada'), ('Finalizada');

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
    image_url TEXT,
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
-- Ajuste de Foreign Keys para eliminar en cascada usuarios relacionados
--Auctions
ALTER TABLE auctions
DROP CONSTRAINT auctions_auctioneer_id_fkey;

ALTER TABLE auctions
ADD CONSTRAINT auctions_auctioneer_id_fkey
FOREIGN KEY (auctioneer_id)
REFERENCES users(id)
ON DELETE CASCADE;

--Offers Auctioneer
ALTER TABLE offers
DROP CONSTRAINT offers_auctioneer_id_fkey;

ALTER TABLE offers
ADD CONSTRAINT offers_auctioneer_id_fkey
FOREIGN KEY (auctioneer_id)
REFERENCES users(id)
ON DELETE CASCADE;

--Offers Bidder
ALTER TABLE offers
DROP CONSTRAINT offers_bidder_id_fkey;

ALTER TABLE offers
ADD CONSTRAINT offers_bidder_id_fkey
FOREIGN KEY (bidder_id)
REFERENCES users(id)
ON DELETE CASCADE;

--Si se elimina una subasta, se eliminan las ofertas relacionadas
ALTER TABLE offers
DROP CONSTRAINT offers_auction_id_fkey;

ALTER TABLE offers
ADD CONSTRAINT offers_auction_id_fkey
FOREIGN KEY (auction_id)
REFERENCES auctions(id)
ON DELETE CASCADE;


-- Datos de ejemplo


-- Usuarios de ejemplo
INSERT INTO users (username, psswd, email, firstname, lastname, tel, image_url) VALUES
('CeratiLover<3', 'soyunacontraseña', 'zeki@email.com', 'Ezequiel', 'Garcia', 1125748730, 'https://i.pinimg.com/736x/f0/dd/b6/f0ddb6c973a34cae1ee9d9ac93c00fa1.jpg'),
('alexespindola', 'clave123', 'alex@email.com', 'Alex', 'Espíndola', 1123456789, 'https://avatars.githubusercontent.com/u/229040527?v=4'),
('felipetorres', 'clave123', 'felipe@email.com', 'Felipe', 'Torres', 1134567890, 'https://avatars.githubusercontent.com/u/175356733?v=4'),
('leandrocejas', 'clave123', 'leandro@email.com', 'Leandro', 'Cejas', 1145678901, 'https://avatars.githubusercontent.com/u/239258884?v=4');

-- Subastas mezcladas aleatoriamente con imágenes reales
INSERT INTO auctions (title, descripcion, initial_price, category_id, condition, images_urls, auctioneer_id, offer_type, auction_status, location_id) VALUES
('Auriculares Gamer RGB', 'Auriculares con luces LED y sonido envolvente, perfectos para largas sesiones de juego.', 100, 1, 1, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop', 3, 1, 1, 1),
('Teclado Mecánico Retroiluminado', 'Teclado mecánico con switches azules y retroiluminación personalizable.', 110, 2, 2, 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w-800&auto=format&fit=crop', 1, 2, 1, 1),
('Mouse Inalámbrico Ergonómico', 'Mouse inalámbrico con diseño ergonómico y batería de larga duración.', 120, 3, 3, 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&auto=format&fit=crop', 4, 3, 1, 1),
('Monitor UltraWide 29"', 'Monitor UltraWide ideal para multitarea y edición de video.', 130, 4, 1, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop', 2, 1, 1, 1),
('Camiseta Oficial de Fútbol', 'Camiseta original de la temporada 2023, talla L.', 140, 5, 2, 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop', 3, 2, 1, 1),
('Bicicleta de Montaña', 'Bicicleta con suspensión delantera y frenos a disco, poco uso.', 150, 6, 3, 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop', 1, 3, 1, 1),
('Guitarra Criolla', 'Guitarra de madera maciza, excelente sonido y terminación.', 160, 7, 1, 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&auto=format&fit=crop', 4, 1, 1, 1),
('Set de Herramientas 50 piezas', 'Completo set de herramientas para el hogar y el auto.', 170, 8, 2, 'https://images.unsplash.com/photo-1581235720706-9856d6d1c42a?w=800&auto=format&fit=crop', 2, 2, 1, 1),
('Libro "Cien Años de Soledad"', 'Edición especial ilustrada del clásico de García Márquez.', 180, 9, 3, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop', 3, 3, 1, 1),
('Vinilo de Queen', 'Disco de vinilo original de Queen, edición coleccionista.', 190, 10, 1, 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop', 1, 1, 1, 1),
('Cámara Reflex Canon', 'Cámara profesional Canon con lente 18-55mm, ideal para fotografía y video.', 200, 1, 1, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop', 4, 1, 1, 1),
('Smartwatch Deportivo', 'Reloj inteligente con GPS y monitor de ritmo cardíaco.', 210, 2, 2, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop', 2, 2, 1, 1),
('Silla Gamer Reclinable', 'Silla ergonómica con soporte lumbar y reposabrazos ajustables.', 220, 3, 3, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop', 3, 3, 1, 1),
('Cafetera Express', 'Cafetera para espresso y capuccino, poco uso.', 230, 4, 1, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop', 1, 1, 1, 1),
('Zapatillas Running', 'Zapatillas deportivas para running, número 42.', 240, 5, 2, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop', 4, 2, 1, 1),
('Raqueta de Tenis', 'Raqueta profesional de grafito, excelente estado.', 250, 6, 3, 'https://images.unsplash.com/photo-1554385499-9105d4a9978e?w=800&auto=format&fit=crop', 2, 3, 1, 1),
('Set de Lego Star Wars', 'Set original de Lego Star Wars, edición limitada.', 260, 7, 1, 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=800&auto=format&fit=crop', 3, 1, 1, 1),
('Colección de Comics Marvel', 'Lote de 20 comics originales de Marvel.', 270, 8, 2, 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&auto=format&fit=crop', 1, 2, 1, 1),
('Libro "El Principito"', 'Edición de lujo ilustrada de El Principito.', 280, 9, 3, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop', 4, 3, 1, 1),
('Vinilo de The Beatles', 'Disco de vinilo original de The Beatles, edición especial.', 290, 10, 1, 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&auto=format&fit=crop', 2, 1, 1, 1),
('Cámara GoPro Hero', 'Cámara de acción GoPro Hero, resistente al agua y golpes.', 300, 1, 1, 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&auto=format&fit=crop', 1, 1, 1, 1),
('Parlante Bluetooth JBL', 'Parlante portátil JBL con batería de 12 horas.', 310, 2, 2, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop', 3, 2, 1, 1),
('Tablet Samsung Galaxy', 'Tablet Samsung de 10 pulgadas, ideal para estudiar.', 320, 3, 3, 'https://images.unsplash.com/photo-1546054451-6f5be8d5f99b?w=800&auto=format&fit=crop', 4, 3, 1, 1),
('Heladera No Frost', 'Heladera con freezer, tecnología No Frost, poco uso.', 330, 4, 1, 'https://images.unsplash.com/photo-1594736797933-d0b6c89d1c43?w=800&auto=format&fit=crop', 2, 1, 1, 1),
('Campera de Cuero', 'Campera de cuero legítimo, talle M.', 340, 5, 2, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop', 1, 2, 1, 1),
('Bicicleta Urbana', 'Bicicleta urbana rodado 28, ideal para la ciudad.', 350, 6, 3, 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&auto=format&fit=crop', 3, 3, 1, 1),
('Pintura Acrílica', 'Obra original en acrílico sobre lienzo, firmada.', 360, 7, 1, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop', 4, 1, 1, 1),
('Set de Copas de Vino', 'Set de 6 copas de cristal para vino tinto.', 370, 8, 2, 'https://images.unsplash.com/photo-1511300636408-a63a89df3482?w=800&auto=format&fit=crop', 2, 2, 1, 1),
('Libro "Rayuela"', 'Edición especial de Rayuela de Julio Cortázar.', 380, 9, 3, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop', 1, 3, 1, 1),
('Vinilo de Pink Floyd', 'Disco de vinilo original de Pink Floyd, The Wall.', 390, 10, 1, 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop', 3, 1, 1, 1),
('Guitarra Eléctrica Stratocaster', 'Guitarra eléctrica con estuche rígido y amplificador incluido.', 500, 1, 1, 'https://images.unsplash.com/photo-1558098329-a0cbd5c2b388?w=800&auto=format&fit=crop', 2, 1, 1, 1),
('Notebook Lenovo i7', 'Notebook Lenovo con procesador i7, 16GB RAM y SSD de 512GB.', 600, 2, 2, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop', 4, 2, 1, 1),
('Celular Samsung S22', 'Celular Samsung Galaxy S22, color negro, 128GB.', 700, 3, 3, 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop', 1, 3, 1, 1),
('Cámara Nikon D3500', 'Cámara réflex Nikon D3500 con lente 18-55mm.', 800, 4, 1, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop', 3, 1, 1, 1),
('Bicicleta Fixie', 'Bicicleta urbana tipo fixie, color azul.', 900, 5, 2, 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&auto=format&fit=crop', 2, 2, 1, 1),
('Smart TV 50"', 'Smart TV 4K UHD de 50 pulgadas, WiFi y apps.', 1000, 6, 3, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop', 4, 3, 1, 1),
('Auriculares Sony WH-1000XM4', 'Auriculares inalámbricos con cancelación de ruido.', 1100, 7, 1, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop', 1, 1, 1, 1),
('Set de Maletas', 'Set de 3 maletas rígidas con ruedas giratorias.', 1200, 8, 2, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop', 3, 2, 1, 1),
('Libro "1984"', 'Edición especial de 1984 de George Orwell.', 1300, 9, 3, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop', 2, 3, 1, 1),
('Vinilo de Soda Stereo', 'Disco de vinilo original de Soda Stereo, Signos.', 1400, 10, 1, 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&auto=format&fit=crop', 4, 1, 1, 1);
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
-- Subastas de ejemplo para cada usuario (IDs de usuario: 1=Ezequiel, 2=Alex, 3=Felipe, 4=Leandro)
-- Usamos categorías, condiciones y tipos de oferta válidos (puedes ajustar los IDs si es necesario)

-- Subastas para Alex Espíndola
INSERT INTO auctions (title, descripcion, initial_price, category_id, condition, images_urls, auctioneer_id, offer_type, auction_status, location_id)
VALUES
('Auriculares Gamer RGB', 'Auriculares con luces LED y sonido envolvente, perfectos para largas sesiones de juego.', 100, 1, 1, 'https://via.placeholder.com/150', 2, 1, 1, 1),
('Teclado Mecánico Retroiluminado', 'Teclado mecánico con switches azules y retroiluminación personalizable.', 110, 2, 2, 'https://via.placeholder.com/150', 2, 2, 1, 1),
('Mouse Inalámbrico Ergonómico', 'Mouse inalámbrico con diseño ergonómico y batería de larga duración.', 120, 3, 3, 'https://via.placeholder.com/150', 2, 3, 1, 1),
('Monitor UltraWide 29"', 'Monitor UltraWide ideal para multitarea y edición de video.', 130, 4, 1, 'https://via.placeholder.com/150', 2, 1, 1, 1),
('Camiseta Oficial de Fútbol', 'Camiseta original de la temporada 2023, talla L.', 140, 5, 2, 'https://via.placeholder.com/150', 2, 2, 1, 1),
('Bicicleta de Montaña', 'Bicicleta con suspensión delantera y frenos a disco, poco uso.', 150, 6, 3, 'https://via.placeholder.com/150', 2, 3, 1, 1),
('Guitarra Criolla', 'Guitarra de madera maciza, excelente sonido y terminación.', 160, 7, 1, 'https://via.placeholder.com/150', 2, 1, 1, 1),
('Set de Herramientas 50 piezas', 'Completo set de herramientas para el hogar y el auto.', 170, 8, 2, 'https://via.placeholder.com/150', 2, 2, 1, 1),
('Libro "Cien Años de Soledad"', 'Edición especial ilustrada del clásico de García Márquez.', 180, 9, 3, 'https://via.placeholder.com/150', 2, 3, 1, 1),
('Vinilo de Queen', 'Disco de vinilo original de Queen, edición coleccionista.', 190, 10, 1, 'https://via.placeholder.com/150', 2, 1, 1, 1),
('Cámara Reflex Canon', 'Cámara profesional Canon con lente 18-55mm, ideal para fotografía y video.', 200, 1, 1, 'https://via.placeholder.com/150', 3, 1, 1, 1),
('Smartwatch Deportivo', 'Reloj inteligente con GPS y monitor de ritmo cardíaco.', 210, 2, 2, 'https://via.placeholder.com/150', 2, 2, 1, 1),
('Silla Gamer Reclinable', 'Silla ergonómica con soporte lumbar y reposabrazos ajustables.', 220, 3, 3, 'https://via.placeholder.com/150', 3, 3, 1, 1),
('Cafetera Express', 'Cafetera para espresso y capuccino, poco uso.', 230, 4, 1, 'https://via.placeholder.com/150', 2, 1, 1, 1),
('Zapatillas Running', 'Zapatillas deportivas para running, número 42.', 240, 5, 2, 'https://via.placeholder.com/150', 3, 2, 1, 1),
('Raqueta de Tenis', 'Raqueta profesional de grafito, excelente estado.', 250, 6, 3, 'https://via.placeholder.com/150', 2, 3, 1, 1),
('Set de Lego Star Wars', 'Set original de Lego Star Wars, edición limitada.', 260, 7, 1, 'https://via.placeholder.com/150', 3, 1, 1, 1),
('Colección de Comics Marvel', 'Lote de 20 comics originales de Marvel.', 270, 8, 2, 'https://via.placeholder.com/150', 2, 2, 1, 1),
('Libro "El Principito"', 'Edición de lujo ilustrada de El Principito.', 280, 9, 3, 'https://via.placeholder.com/150', 3, 3, 1, 1),
('Vinilo de The Beatles', 'Disco de vinilo original de The Beatles, edición especial.', 290, 10, 1, 'https://via.placeholder.com/150', 2, 1, 1, 1),
('Cámara GoPro Hero', 'Cámara de acción GoPro Hero, resistente al agua y golpes.', 300, 1, 1, 'https://via.placeholder.com/150', 1, 1, 1, 1),
('Parlante Bluetooth JBL', 'Parlante portátil JBL con batería de 12 horas.', 310, 2, 2, 'https://via.placeholder.com/150', 3, 2, 1, 1),
('Tablet Samsung Galaxy', 'Tablet Samsung de 10 pulgadas, ideal para estudiar.', 320, 3, 3, 'https://via.placeholder.com/150', 4, 3, 1, 1),
('Heladera No Frost', 'Heladera con freezer, tecnología No Frost, poco uso.', 330, 4, 1, 'https://via.placeholder.com/150', 2, 1, 1, 1),
('Campera de Cuero', 'Campera de cuero legítimo, talle M.', 340, 5, 2, 'https://via.placeholder.com/150', 1, 2, 1, 1),
('Bicicleta Urbana', 'Bicicleta urbana rodado 28, ideal para la ciudad.', 350, 6, 3, 'https://via.placeholder.com/150', 3, 3, 1, 1),
('Pintura Acrílica', 'Obra original en acrílico sobre lienzo, firmada.', 360, 7, 1, 'https://via.placeholder.com/150', 4, 1, 1, 1),
('Set de Copas de Vino', 'Set de 6 copas de cristal para vino tinto.', 370, 8, 2, 'https://via.placeholder.com/150', 2, 2, 1, 1),
('Libro "Rayuela"', 'Edición especial de Rayuela de Julio Cortázar.', 380, 9, 3, 'https://via.placeholder.com/150', 1, 3, 1, 1),
('Vinilo de Pink Floyd', 'Disco de vinilo original de Pink Floyd, The Wall.', 390, 10, 1, 'https://via.placeholder.com/150', 3, 1, 1, 1),
('Guitarra Eléctrica Stratocaster', 'Guitarra eléctrica con estuche rígido y amplificador incluido.', 500, 1, 1, 'https://via.placeholder.com/150', 2, 1, 1, 1),
('Notebook Lenovo i7', 'Notebook Lenovo con procesador i7, 16GB RAM y SSD de 512GB.', 600, 2, 2, 'https://via.placeholder.com/150', 4, 2, 1, 1),
('Celular Samsung S22', 'Celular Samsung Galaxy S22, color negro, 128GB.', 700, 3, 3, 'https://via.placeholder.com/150', 1, 3, 1, 1),
('Cámara Nikon D3500', 'Cámara réflex Nikon D3500 con lente 18-55mm.', 800, 4, 1, 'https://via.placeholder.com/150', 3, 1, 1, 1),
('Bicicleta Fixie', 'Bicicleta urbana tipo fixie, color azul.', 900, 5, 2, 'https://via.placeholder.com/150', 2, 2, 1, 1),
('Smart TV 50"', 'Smart TV 4K UHD de 50 pulgadas, WiFi y apps.', 1000, 6, 3, 'https://via.placeholder.com/150', 4, 3, 1, 1),
('Auriculares Sony WH-1000XM4', 'Auriculares inalámbricos con cancelación de ruido.', 1100, 7, 1, 'https://via.placeholder.com/150', 1, 1, 1, 1),
('Set de Maletas', 'Set de 3 maletas rígidas con ruedas giratorias.', 1200, 8, 2, 'https://via.placeholder.com/150', 3, 2, 1, 1),
('Libro "1984"', 'Edición especial de 1984 de George Orwell.', 1300, 9, 3, 'https://via.placeholder.com/150', 2, 3, 1, 1),
('Vinilo de Soda Stereo', 'Disco de vinilo original de Soda Stereo, Signos.', 1400, 10, 1, 'https://via.placeholder.com/150', 4, 1, 1, 1);
-- Ofertas de ejemplo para Ezequiel Garcia (id=1) en subastas de Alex (id=2)
INSERT INTO offers (offer_type, title, descripcion, images_urls, mount, auctioneer_id, bidder_id, auction_id, estado)
VALUES
(1, 'Oferta Ezequiel 1', 'Ezequiel ofrece efectivo por los auriculares gamer de Alex.', 'https://via.placeholder.com/100', 105, 2, 1, 1, 'Activa'),
(2, 'Oferta Ezequiel 2', 'Ezequiel ofrece un libro a cambio del teclado mecánico.', 'https://via.placeholder.com/100', 115, 2, 1, 2, 'Activa'),
(3, 'Oferta Ezequiel 3', 'Ezequiel ofrece una bicicleta por el mouse ergonómico.', 'https://via.placeholder.com/100', 125, 2, 1, 3, 'Activa'),
(1, 'Oferta Ezequiel 4', 'Ezequiel ofrece dinero por el monitor UltraWide.', 'https://via.placeholder.com/100', 135, 2, 1, 4, 'Activa'),
(2, 'Oferta Ezequiel 5', 'Ezequiel ofrece una campera por la camiseta de fútbol.', 'https://via.placeholder.com/100', 145, 2, 1, 5, 'Activa'),
(3, 'Oferta Ezequiel 6', 'Ezequiel ofrece una guitarra criolla por la bici de montaña.', 'https://via.placeholder.com/100', 155, 2, 1, 6, 'Activa'),
(1, 'Oferta Ezequiel 7', 'Ezequiel ofrece dinero por el set de herramientas.', 'https://via.placeholder.com/100', 165, 2, 1, 7, 'Activa'),
(2, 'Oferta Ezequiel 8', 'Ezequiel ofrece un vinilo por el libro de García Márquez.', 'https://via.placeholder.com/100', 175, 2, 1, 8, 'Activa'),
(3, 'Oferta Ezequiel 9', 'Ezequiel ofrece una notebook por el vinilo de Queen.', 'https://via.placeholder.com/100', 185, 2, 1, 9, 'Activa'),
(1, 'Oferta Ezequiel 10', 'Ezequiel ofrece dinero por el vinilo de Queen.', 'https://via.placeholder.com/100', 195, 2, 1, 10, 'Activa');

-- Ofertas de ejemplo: cada usuario hace 10 ofertas en subastas de los otros
-- Alex (id=2) oferta en subastas de Felipe (id=3)
INSERT INTO offers (offer_type, title, descripcion, images_urls, mount, auctioneer_id, bidder_id, auction_id, estado)
VALUES
+(1, 'Oferta Alex 1', 'Alex ofrece dinero por la cámara Canon de Felipe.', 'https://via.placeholder.com/100', 205, 3, 2, 11, 'Activa'),
+(2, 'Oferta Alex 2', 'Alex ofrece una tablet por el smartwatch deportivo.', 'https://via.placeholder.com/100', 215, 3, 2, 12, 'Activa'),
+(3, 'Oferta Alex 3', 'Alex ofrece una guitarra por la silla gamer.', 'https://via.placeholder.com/100', 225, 3, 2, 13, 'Activa'),
+(1, 'Oferta Alex 4', 'Alex ofrece dinero por la cafetera express.', 'https://via.placeholder.com/100', 235, 3, 2, 14, 'Activa'),
+(2, 'Oferta Alex 5', 'Alex ofrece una campera por las zapatillas running.', 'https://via.placeholder.com/100', 245, 3, 2, 15, 'Activa'),
+(3, 'Oferta Alex 6', 'Alex ofrece una bici por la raqueta de tenis.', 'https://via.placeholder.com/100', 255, 3, 2, 16, 'Activa'),
+(1, 'Oferta Alex 7', 'Alex ofrece dinero por el set de Lego Star Wars.', 'https://via.placeholder.com/100', 265, 3, 2, 17, 'Activa'),
+(2, 'Oferta Alex 8', 'Alex ofrece un vinilo por la colección de comics Marvel.', 'https://via.placeholder.com/100', 275, 3, 2, 18, 'Activa'),
+(3, 'Oferta Alex 9', 'Alex ofrece una notebook por el libro El Principito.', 'https://via.placeholder.com/100', 285, 3, 2, 19, 'Activa'),
+(1, 'Oferta Alex 10', 'Alex ofrece dinero por el vinilo de The Beatles.', 'https://via.placeholder.com/100', 295, 3, 2, 20, 'Activa');

-- Felipe (id=3) oferta en subastas de Leandro (id=4)
INSERT INTO offers (offer_type, title, descripcion, images_urls, mount, auctioneer_id, bidder_id, auction_id, estado)
VALUES
+(1, 'Oferta Felipe 1', 'Felipe ofrece dinero por la GoPro de Leandro.', 'https://via.placeholder.com/100', 305, 4, 3, 21, 'Activa'),
+(2, 'Oferta Felipe 2', 'Felipe ofrece una tablet por el parlante JBL.', 'https://via.placeholder.com/100', 315, 4, 3, 22, 'Activa'),
+(3, 'Oferta Felipe 3', 'Felipe ofrece una guitarra por la tablet Samsung.', 'https://via.placeholder.com/100', 325, 4, 3, 23, 'Activa'),
+(1, 'Oferta Felipe 4', 'Felipe ofrece dinero por la heladera No Frost.', 'https://via.placeholder.com/100', 335, 4, 3, 24, 'Activa'),
+(2, 'Oferta Felipe 5', 'Felipe ofrece una campera por la campera de cuero.', 'https://via.placeholder.com/100', 345, 4, 3, 25, 'Activa'),
+(3, 'Oferta Felipe 6', 'Felipe ofrece una bici por la bicicleta urbana.', 'https://via.placeholder.com/100', 355, 4, 3, 26, 'Activa'),
+(1, 'Oferta Felipe 7', 'Felipe ofrece dinero por la pintura acrílica.', 'https://via.placeholder.com/100', 365, 4, 3, 27, 'Activa'),
+(2, 'Oferta Felipe 8', 'Felipe ofrece un vinilo por el set de copas de vino.', 'https://via.placeholder.com/100', 375, 4, 3, 28, 'Activa'),
+(3, 'Oferta Felipe 9', 'Felipe ofrece una notebook por el libro Rayuela.', 'https://via.placeholder.com/100', 385, 4, 3, 29, 'Activa'),
+(1, 'Oferta Felipe 10', 'Felipe ofrece dinero por el vinilo de Pink Floyd.', 'https://via.placeholder.com/100', 395, 4, 3, 30, 'Activa');

-- Leandro (id=4) oferta en subastas de Alex (id=2)
INSERT INTO offers (offer_type, title, descripcion, images_urls, mount, auctioneer_id, bidder_id, auction_id, estado)
VALUES
+(1, 'Oferta Leandro 1', 'Leandro ofrece dinero por los auriculares gamer de Alex.', 'https://via.placeholder.com/100', 305, 2, 4, 1, 'Activa'),
+(2, 'Oferta Leandro 2', 'Leandro ofrece una tablet por el teclado mecánico.', 'https://via.placeholder.com/100', 315, 2, 4, 2, 'Activa'),
+(3, 'Oferta Leandro 3', 'Leandro ofrece una guitarra por el mouse ergonómico.', 'https://via.placeholder.com/100', 325, 2, 4, 3, 'Activa'),
+(1, 'Oferta Leandro 4', 'Leandro ofrece dinero por el monitor UltraWide.', 'https://via.placeholder.com/100', 335, 2, 4, 4, 'Activa'),
+(2, 'Oferta Leandro 5', 'Leandro ofrece una campera por la camiseta de fútbol.', 'https://via.placeholder.com/100', 345, 2, 4, 5, 'Activa'),
+(3, 'Oferta Leandro 6', 'Leandro ofrece una bici por la bici de montaña.', 'https://via.placeholder.com/100', 355, 2, 4, 6, 'Activa'),
+(1, 'Oferta Leandro 7', 'Leandro ofrece dinero por el set de herramientas.', 'https://via.placeholder.com/100', 365, 2, 4, 7, 'Activa'),
+(2, 'Oferta Leandro 8', 'Leandro ofrece un vinilo por el libro de García Márquez.', 'https://via.placeholder.com/100', 375, 2, 4, 8, 'Activa'),
+(3, 'Oferta Leandro 9', 'Leandro ofrece una notebook por el vinilo de Queen.', 'https://via.placeholder.com/100', 385, 2, 4, 9, 'Activa'),
+(1, 'Oferta Leandro 10', 'Leandro ofrece dinero por el vinilo de Queen.', 'https://via.placeholder.com/100', 395, 2, 4, 10, 'Activa');

-- Subastas mezcladas aleatoriamente
INSERT INTO auctions (title, descripcion, initial_price, category_id, condition, images_urls, auctioneer_id, offer_type, auction_status, location_id) VALUES
('Auriculares Gamer RGB', 'Auriculares con luces LED y sonido envolvente, perfectos para largas sesiones de juego.', 100, 1, 1, 'https://via.placeholder.com/150', 3, 1, 1, 1),
('Teclado Mecánico Retroiluminado', 'Teclado mecánico con switches azules y retroiluminación personalizable.', 110, 2, 2, 'https://via.placeholder.com/150', 1, 2, 1, 1),
('Mouse Inalámbrico Ergonómico', 'Mouse inalámbrico con diseño ergonómico y batería de larga duración.', 120, 3, 3, 'https://via.placeholder.com/150', 4, 3, 1, 1),
('Monitor UltraWide 29"', 'Monitor UltraWide ideal para multitarea y edición de video.', 130, 4, 1, 'https://via.placeholder.com/150', 2, 1, 1, 1),
('Camiseta Oficial de Fútbol', 'Camiseta original de la temporada 2023, talla L.', 140, 5, 2, 'https://via.placeholder.com/150', 3, 2, 1, 1),
('Bicicleta de Montaña', 'Bicicleta con suspensión delantera y frenos a disco, poco uso.', 150, 6, 3, 'https://via.placeholder.com/150', 1, 3, 1, 1),
('Guitarra Criolla', 'Guitarra de madera maciza, excelente sonido y terminación.', 160, 7, 1, 'https://via.placeholder.com/150', 4, 1, 1, 1),
('Set de Herramientas 50 piezas', 'Completo set de herramientas para el hogar y el auto.', 170, 8, 2, 'https://via.placeholder.com/150', 2, 2, 1, 1),
('Libro "Cien Años de Soledad"', 'Edición especial ilustrada del clásico de García Márquez.', 180, 9, 3, 'https://via.placeholder.com/150', 3, 3, 1, 1),
('Vinilo de Queen', 'Disco de vinilo original de Queen, edición coleccionista.', 190, 10, 1, 'https://via.placeholder.com/150', 1, 1, 1, 1),
('Cámara Reflex Canon', 'Cámara profesional Canon con lente 18-55mm, ideal para fotografía y video.', 200, 1, 1, 'https://via.placeholder.com/150', 4, 1, 1, 1),
('Smartwatch Deportivo', 'Reloj inteligente con GPS y monitor de ritmo cardíaco.', 210, 2, 2, 'https://via.placeholder.com/150', 2, 2, 1, 1),
('Silla Gamer Reclinable', 'Silla ergonómica con soporte lumbar y reposabrazos ajustables.', 220, 3, 3, 'https://via.placeholder.com/150', 3, 3, 1, 1),
('Cafetera Express', 'Cafetera para espresso y capuccino, poco uso.', 230, 4, 1, 'https://via.placeholder.com/150', 1, 1, 1, 1),
('Zapatillas Running', 'Zapatillas deportivas para running, número 42.', 240, 5, 2, 'https://via.placeholder.com/150', 4, 2, 1, 1),
('Raqueta de Tenis', 'Raqueta profesional de grafito, excelente estado.', 250, 6, 3, 'https://via.placeholder.com/150', 2, 3, 1, 1),
('Set de Lego Star Wars', 'Set original de Lego Star Wars, edición limitada.', 260, 7, 1, 'https://via.placeholder.com/150', 3, 1, 1, 1),
('Colección de Comics Marvel', 'Lote de 20 comics originales de Marvel.', 270, 8, 2, 'https://via.placeholder.com/150', 1, 2, 1, 1),
('Libro "El Principito"', 'Edición de lujo ilustrada de El Principito.', 280, 9, 3, 'https://via.placeholder.com/150', 4, 3, 1, 1),
('Vinilo de The Beatles', 'Disco de vinilo original de The Beatles, edición especial.', 290, 10, 1, 'https://via.placeholder.com/150', 2, 1, 1, 1),
('Cámara GoPro Hero', 'Cámara de acción GoPro Hero, resistente al agua y golpes.', 300, 1, 1, 'https://via.placeholder.com/150', 1, 1, 1, 1),
('Parlante Bluetooth JBL', 'Parlante portátil JBL con batería de 12 horas.', 310, 2, 2, 'https://via.placeholder.com/150', 3, 2, 1, 1),
('Tablet Samsung Galaxy', 'Tablet Samsung de 10 pulgadas, ideal para estudiar.', 320, 3, 3, 'https://via.placeholder.com/150', 4, 3, 1, 1),
('Heladera No Frost', 'Heladera con freezer, tecnología No Frost, poco uso.', 330, 4, 1, 'https://via.placeholder.com/150', 2, 1, 1, 1),
('Campera de Cuero', 'Campera de cuero legítimo, talle M.', 340, 5, 2, 'https://via.placeholder.com/150', 1, 2, 1, 1),
('Bicicleta Urbana', 'Bicicleta urbana rodado 28, ideal para la ciudad.', 350, 6, 3, 'https://via.placeholder.com/150', 3, 3, 1, 1),
('Pintura Acrílica', 'Obra original en acrílico sobre lienzo, firmada.', 360, 7, 1, 'https://via.placeholder.com/150', 4, 1, 1, 1),
('Set de Copas de Vino', 'Set de 6 copas de cristal para vino tinto.', 370, 8, 2, 'https://via.placeholder.com/150', 2, 2, 1, 1),
('Libro "Rayuela"', 'Edición especial de Rayuela de Julio Cortázar.', 380, 9, 3, 'https://via.placeholder.com/150', 1, 3, 1, 1),
('Vinilo de Pink Floyd', 'Disco de vinilo original de Pink Floyd, The Wall.', 390, 10, 1, 'https://via.placeholder.com/150', 3, 1, 1, 1),
('Guitarra Eléctrica Stratocaster', 'Guitarra eléctrica con estuche rígido y amplificador incluido.', 500, 1, 1, 'https://via.placeholder.com/150', 2, 1, 1, 1),
('Notebook Lenovo i7', 'Notebook Lenovo con procesador i7, 16GB RAM y SSD de 512GB.', 600, 2, 2, 'https://via.placeholder.com/150', 4, 2, 1, 1),
('Celular Samsung S22', 'Celular Samsung Galaxy S22, color negro, 128GB.', 700, 3, 3, 'https://via.placeholder.com/150', 1, 3, 1, 1),
('Cámara Nikon D3500', 'Cámara réflex Nikon D3500 con lente 18-55mm.', 800, 4, 1, 'https://via.placeholder.com/150', 3, 1, 1, 1),
('Bicicleta Fixie', 'Bicicleta urbana tipo fixie, color azul.', 900, 5, 2, 'https://via.placeholder.com/150', 2, 2, 1, 1),
('Smart TV 50"', 'Smart TV 4K UHD de 50 pulgadas, WiFi y apps.', 1000, 6, 3, 'https://via.placeholder.com/150', 4, 3, 1, 1),
('Auriculares Sony WH-1000XM4', 'Auriculares inalámbricos con cancelación de ruido.', 1100, 7, 1, 'https://via.placeholder.com/150', 1, 1, 1, 1),
('Set de Maletas', 'Set de 3 maletas rígidas con ruedas giratorias.', 1200, 8, 2, 'https://via.placeholder.com/150', 3, 2, 1, 1),
('Libro "1984"', 'Edición especial de 1984 de George Orwell.', 1300, 9, 3, 'https://via.placeholder.com/150', 2, 3, 1, 1),
('Vinilo de Soda Stereo', 'Disco de vinilo original de Soda Stereo, Signos.', 1400, 10, 1, 'https://via.placeholder.com/150', 4, 1, 1, 1);
-- Ofertas mezcladas aleatoriamente
INSERT INTO offers (offer_type, title, descripcion, images_urls, mount, auctioneer_id, bidder_id, auction_id, estado) VALUES
(1, 'Oferta Creativa 1', 'Ezequiel ofrece efectivo por los auriculares gamer de Alex.', 'https://via.placeholder.com/100', 105, 3, 1, 1, 'Activa'),
(2, 'Oferta Creativa 2', 'Alex ofrece un libro a cambio del teclado mecánico.', 'https://via.placeholder.com/100', 115, 1, 2, 2, 'Activa'),
(3, 'Oferta Creativa 3', 'Felipe ofrece una bicicleta por el mouse ergonómico.', 'https://via.placeholder.com/100', 125, 4, 3, 3, 'Activa'),
(1, 'Oferta Creativa 4', 'Leandro ofrece dinero por el monitor UltraWide.', 'https://via.placeholder.com/100', 135, 2, 4, 4, 'Activa'),
(2, 'Oferta Creativa 5', 'Ezequiel ofrece una campera por la camiseta de fútbol.', 'https://via.placeholder.com/100', 145, 3, 1, 5, 'Activa'),
(3, 'Oferta Creativa 6', 'Alex ofrece una guitarra criolla por la bici de montaña.', 'https://via.placeholder.com/100', 155, 1, 2, 6, 'Activa'),
(1, 'Oferta Creativa 7', 'Felipe ofrece dinero por el set de herramientas.', 'https://via.placeholder.com/100', 165, 4, 3, 7, 'Activa'),
(2, 'Oferta Creativa 8', 'Leandro ofrece un vinilo por el libro de García Márquez.', 'https://via.placeholder.com/100', 175, 2, 4, 8, 'Activa'),
(3, 'Oferta Creativa 9', 'Ezequiel ofrece una notebook por el vinilo de Queen.', 'https://via.placeholder.com/100', 185, 1, 3, 9, 'Activa'),
(1, 'Oferta Creativa 10', 'Alex ofrece dinero por el vinilo de Queen.', 'https://via.placeholder.com/100', 195, 3, 2, 10, 'Activa'),
(2, 'Oferta Creativa 11', 'Felipe ofrece dinero por la cámara Canon.', 'https://via.placeholder.com/100', 205, 4, 3, 11, 'Activa'),
(3, 'Oferta Creativa 12', 'Leandro ofrece una tablet por el smartwatch deportivo.', 'https://via.placeholder.com/100', 215, 2, 4, 12, 'Activa'),
(1, 'Oferta Creativa 13', 'Ezequiel ofrece una guitarra por la silla gamer.', 'https://via.placeholder.com/100', 225, 1, 3, 13, 'Activa'),
(2, 'Oferta Creativa 14', 'Alex ofrece dinero por la cafetera express.', 'https://via.placeholder.com/100', 235, 3, 2, 14, 'Activa'),
(3, 'Oferta Creativa 15', 'Felipe ofrece una campera por las zapatillas running.', 'https://via.placeholder.com/100', 245, 4, 3, 15, 'Activa'),
(1, 'Oferta Creativa 16', 'Leandro ofrece una bici por la raqueta de tenis.', 'https://via.placeholder.com/100', 2, 4, 16, 'Activa'),
(2, 'Oferta Creativa 17', 'Ezequiel ofrece dinero por el set de Lego Star Wars.', 'https://via.placeholder.com/100', 265, 1, 3, 17, 'Activa'),
(3, 'Oferta Creativa 18', 'Alex ofrece un vinilo por la colección de comics Marvel.', 'https://via.placeholder.com/100', 275, 3, 2, 18, 'Activa'),
(1, 'Oferta Creativa 19', 'Felipe ofrece una notebook por el libro El Principito.', 'https://via.placeholder.com/100', 285, 4, 3, 19, 'Activa'),
(2, 'Oferta Creativa 20', 'Leandro ofrece dinero por el vinilo de The Beatles.', 'https://via.placeholder.com/100', 295, 2, 4, 20, 'Activa'),
(3, 'Oferta Creativa 21', 'Ezequiel ofrece dinero por la GoPro de Leandro.', 'https://via.placeholder.com/100', 305, 1, 3, 21, 'Activa'),
(1, 'Oferta Creativa 22', 'Alex ofrece una tablet por el parlante JBL.', 'https://via.placeholder.com/100', 315, 3, 2, 22, 'Activa'),
(2, 'Oferta Creativa 23', 'Felipe ofrece una guitarra por la tablet Samsung.', 'https://via.placeholder.com/100', 325, 4, 3, 23, 'Activa'),
(3, 'Oferta Creativa 24', 'Leandro ofrece dinero por la heladera No Frost.', 'https://via.placeholder.com/100', 335, 2, 4, 24, 'Activa'),
(1, 'Oferta Creativa 25', 'Ezequiel ofrece una campera por la campera de cuero.', 'https://via.placeholder.com/100', 345, 1, 3, 25, 'Activa'),
(2, 'Oferta Creativa 26', 'Alex ofrece una bici por la bicicleta urbana.', 'https://via.placeholder.com/100', 355, 3, 2, 26, 'Activa'),
(3, 'Oferta Creativa 27', 'Felipe ofrece dinero por la pintura acrílica.', 'https://via.placeholder.com/100', 365, 4, 3, 27, 'Activa'),
(1, 'Oferta Creativa 28', 'Leandro ofrece un vinilo por el set de copas de vino.', 'https://via.placeholder.com/100', 375, 2, 4, 28, 'Activa'),
(2, 'Oferta Creativa 29', 'Ezequiel ofrece una notebook por el libro Rayuela.', 'https://via.placeholder.com/100', 385, 1, 3, 29, 'Activa'),
(3, 'Oferta Creativa 30', 'Alex ofrece dinero por el vinilo de Pink Floyd.', 'https://via.placeholder.com/100', 395, 3, 2, 30, 'Activa'),
(1, 'Oferta Creativa 31', 'Felipe ofrece dinero por la guitarra Stratocaster.', 'https://via.placeholder.com/100', 505, 4, 3, 31, 'Activa'),
(2, 'Oferta Creativa 32', 'Leandro ofrece una tablet por la notebook Lenovo.', 'https://via.placeholder.com/100', 615, 2, 4, 32, 'Activa'),
(3, 'Oferta Creativa 33', 'Ezequiel ofrece una guitarra por el celular Samsung.', 'https://via.placeholder.com/100', 725, 1, 3, 33, 'Activa'),
(1, 'Oferta Creativa 34', 'Alex ofrece dinero por la cámara Nikon.', 'https://via.placeholder.com/100', 835, 3, 2, 34, 'Activa'),
(2, 'Oferta Creativa 35', 'Felipe ofrece una campera por la bicicleta fixie.', 'https://via.placeholder.com/100', 945, 4, 3, 35, 'Activa'),
(3, 'Oferta Creativa 36', 'Leandro ofrece una bici por el Smart TV.', 'https://via.placeholder.com/100', 1055, 2, 4, 36, 'Activa'),
(1, 'Oferta Creativa 37', 'Ezequiel ofrece dinero por los auriculares Sony.', 'https://via.placeholder.com/100', 1165, 1, 3, 37, 'Activa'),
(2, 'Oferta Creativa 38', 'Alex ofrece un vinilo por el set de maletas.', 'https://via.placeholder.com/100', 1275, 3, 2, 38, 'Activa'),
(3, 'Oferta Creativa 39', 'Felipe ofrece una notebook por el libro 1984.', 'https://via.placeholder.com/100', 1385, 4, 3, 39, 'Activa'),
(1, 'Oferta Creativa 40', 'Leandro ofrece dinero por el vinilo de Soda Stereo.', 'https://via.placeholder.com/100', 1495, 2, 4, 40, 'Activa');



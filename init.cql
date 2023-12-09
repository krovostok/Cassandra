-- Sukuriame keyspace 'eshop'
CREATE KEYSPACE IF NOT EXISTS eshop WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

-- Aktyvuojame keyspace 'eshop'
USE eshop;

-- Sukuriame lentelę 'clients'
CREATE TABLE IF NOT EXISTS clients (
    client_id int PRIMARY KEY,
    first_name text,
    last_name text,
    email text
);

-- Sukuriame lentelę 'products'
CREATE TABLE IF NOT EXISTS products (
    product_id int PRIMARY KEY,
    name text,
    price decimal,
    description text,
    category text
);

-- Atnaujiname lentelę 'orders', įtraukdami užsakymo detales kaip tekstą
CREATE TABLE IF NOT EXISTS orders (
    order_id int,
    client_id int,
    order_date timestamp,
    total_amount decimal,
    order_details text,  -- Užsakymo detalės kaip tekstas
    PRIMARY KEY ((client_id), order_id)
) WITH CLUSTERING ORDER BY (order_id DESC);

-- Sukuriame lentelę 'reviews'
CREATE TABLE IF NOT EXISTS reviews (
    review_id int PRIMARY KEY,
    client_id int,
    product_id int,
    review_text text,
    rating int
);

-- Sukuriame lentelę 'orders_by_clients' 
CREATE TABLE IF NOT EXISTS orders_by_client_date (
    client_id int,
    order_id int,
    order_date timestamp,
    total_amount decimal,
    order_details text,
    PRIMARY KEY (client_id, order_date, order_id)
) WITH CLUSTERING ORDER BY (order_date DESC, order_id ASC);


-- Sukuriame lentelę 'product_reviews'
CREATE TABLE IF NOT EXISTS product_reviews_by_product_rating (
    product_id int,
    rating int,
    review_date timestamp,
    review_id int,
    client_id int,
    review_text text,
    PRIMARY KEY ((product_id, rating), review_date, review_id)
) WITH CLUSTERING ORDER BY (review_date DESC, review_id ASC);


INSERT INTO products (product_id, name, price, description, category) VALUES (1, 'Prekė 1', 100.00, 'Aprašymas 1', 'Kategorija 1');
INSERT INTO products (product_id, name, price, description, category) VALUES (2, 'Prekė 2', 200.00, 'Aprašymas 2', 'Kategorija 2');
INSERT INTO products (product_id, name, price, description, category) VALUES (3, 'Prekė 3', 300.00, 'Aprašymas 3', 'Kategorija 3');
INSERT INTO products (product_id, name, price, description, category) VALUES (4, 'Prekė 4', 400.00, 'Aprašymas 4', 'Kategorija 4');
INSERT INTO products (product_id, name, price, description, category) VALUES (5, 'Prekė 5', 500.00, 'Aprašymas 5', 'Kategorija 5');
CREATE KEYSPACE IF NOT EXISTS eshop WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE eshop;

CREATE TABLE IF NOT EXISTS clients (
    client_id int PRIMARY KEY,
    first_name text,
    last_name text,
    email text
);

CREATE TABLE IF NOT EXISTS products (
    product_id int PRIMARY KEY,
    name text,
    price decimal,
    description text,
    category text
);

CREATE TABLE IF NOT EXISTS orders (
    order_id int,
    client_id int,
    order_date timestamp,
    total_amount decimal,
    order_details text,  -- Užsakymo detalės kaip tekstas
    PRIMARY KEY ((client_id), order_id)
) WITH CLUSTERING ORDER BY (order_id DESC);

CREATE TABLE IF NOT EXISTS reviews (
    review_id int PRIMARY KEY,
    client_id int,
    product_id int,
    review_text text,
    rating int
);

CREATE TABLE IF NOT EXISTS orders_by_client_date (
    client_id int,
    order_id int,
    order_date timestamp,
    total_amount decimal,
    order_details text,
    PRIMARY KEY (client_id, order_date, order_id)
) WITH CLUSTERING ORDER BY (order_date DESC, order_id ASC);

CREATE TABLE IF NOT EXISTS product_reviews_by_product_rating (
    product_id int,
    rating int,
    review_date timestamp,
    review_id int,
    client_id int,
    review_text text,
    PRIMARY KEY ((product_id, rating), review_date, review_id)
) WITH CLUSTERING ORDER BY (review_date DESC, review_id ASC);

INSERT INTO products (product_id, name, price, description, category) VALUES (1, 'No', 100.00, 'regular No', 'regular answers');
INSERT INTO products (product_id, name, price, description, category) VALUES (2, 'Maybe', 200.00, 'regular Maybe', 'regular answers');
INSERT INTO products (product_id, name, price, description, category) VALUES (3, 'Yes', 300.00, 'regular Yes', 'regular answers');
INSERT INTO products (product_id, name, price, description, category) VALUES (4, 'Definitely', 400.00, 'regular Definitely', 'regular answers');
INSERT INTO products (product_id, name, price, description, category) VALUES (69, 'Kys', 500.00, 'universal answer', 'ultimates');
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS products_orders;

CREATE TABLE users(
    id serial PRIMARY KEY,
    username text UNIQUE NOT NULL,
    password text NOT NULL
);

CREATE TABLE orders(
    id serial PRIMARY KEY,
    date date NOT NULL,
    note text,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE products(
    id serial PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    price decimal NOT NULL
);

CREATE TABLE products_orders(
    id serial PRIMARY KEY,
    order_id integer NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id integer NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity integer NOT NULL
);
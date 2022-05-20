CREATE DATABASE db_pantones;

USE db_pantones;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(20) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users   
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

-- CLIENTS TABLE
CREATE TABLE clients (
    id INT(11) NOT NULL,
    name VARCHAR(150) NOT NULL,
    job VARCHAR(255) NOT NULL,
    formula TEXT,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE clients
    ADD PRIMARY KEY (id);

ALTER TABLE clients
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE clients
    MODIFY user_id INT(11) NOT NULL;

DESCRIBE clients;
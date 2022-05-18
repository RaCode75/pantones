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

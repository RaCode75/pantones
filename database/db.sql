CREATE DATABASE db_pantones;

USE db_pantones;

CREATE TABLE users(
    PRIMARY KEY id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(20) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

DESCRIBE users;
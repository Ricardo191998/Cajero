
-- Creando la base de Datos 

CREATE DATABASE bank CHAR SET = UTF8;


USE bank;

--Creamos usuario para administrar la base 

CREATE USER admin IDENTIFIED BY PASSWORD 'admin';

--Le damos al usuario todos los privigelios sobre la base de datos

GRANT ALL ON bank TO admin;

--Creamos las tablas 


--Tabla usuario 

CREATE TABLE user(
    id_user INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL,
    direction VARCHAR(40) NOT NULL,
    telephone INT NOT NULL,
    PRIMARY KEY(id_user) 
);

DESCRIBE user;

--Tabla cuenta , esta tabla va a almacenar los noCuenta y los pin's MUY IMPORTANTE

CREATE TABLE ccount(
    no_count VARCHAR(11) NOT NULL PRIMARY KEY ,
    pass VARCHAR(4) NOT NULL,
    salary  DOUBLE(20,2) NOT NULL,
    user  INT NOT NULL,
    CONSTRAINT `count_const`
    FOREIGN KEY (user) REFERENCES user (id_user)
);

DESCRIBE ccount;


--Tabla que almacena los depositos 

CREATE TABLE deposit(
    id_deposit INT NOT NULL AUTO_INCREMENT,
    id_count   VARCHAR(11) NOT NULL,
    mount      DOUBLE(20,2) NOT NULL,
    other_count VARCHAR(11)  NOT NULL,
    FOREIGN KEY (id_count) REFERENCES ccount(no_count),
    PRIMARY KEY(id_deposit)
);

DESCRIBE deposit;

--Tabla que registra fechas de depositos

CREATE TABLE historic(
    id_historic INT NOT NULL AUTO_INCREMENT,
    id_deposit  INT NOT NULL,
    day        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FOREIGN KEY (id_deposit) REFERENCES deposit(id_deposit),
    PRIMARY KEY(id_historic)
);

DESCRIBE history;
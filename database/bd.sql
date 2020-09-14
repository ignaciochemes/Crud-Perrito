CREATE DATABASE crudperrito;

USE crudperrito;

CREATE TABLE articulo(
    id INT(12) NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    detalles VARCHAR(200) NOT NULL,
    stock VARCHAR (200) NOT NULL,
    preciocosto VARCHAR(200) NOT NULL,
    precioventa VARCHAR(200) NOT NULL,
    cantidadvendidos VARCHAR(200) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    ganancianeta VARCHAR(200) NOT NULL,
    gananciabruta VARCHAR(200) NOT NULL,
    img VARCHAR(200) NOT NULL
);
--
CREATE TABLE accounts(
    username VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL
);
INSERT INTO accounts (username, password) VALUES (admin, admin);
--
CREATE TABLE ganancias(
    gananciabruta VARCHAR(200) NOT NULL,
    ganancianeta VARCHAR(200) NOT NULL
);
INSERT INTO ganancias (gananciabruta, ganancianeta) VALUES (0, 0);
--
CREATE TABLE gananciasventas(
    gananciabrutaventas VARCHAR(200) NOT NULL
);
INSERT INTO gananciasventas (gananciabrutaventas) VALUES (0);
--
CREATE TABLE ventas(
    id INT(12) NOT NULL,
    fecha VARCHAR(80) NOT NULL,
    producto VARCHAR(200) NOT NULL,
    persona VARCHAR (200) NOT NULL,
    ingresobruto VARCHAR(200) NOT NULL,
    ingresoneto VARCHAR(200) NOT NULL
);

ALTER TABLE articulo
    ADD PRIMARY KEY (id);

ALTER TABLE articulo
    MODIFY id INT(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

ALTER TABLE ventas
    ADD PRIMARY KEY (id);

ALTER TABLE ventas
    MODIFY id INT(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
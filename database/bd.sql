CREATE DATABASE crudperrito;

USE crudperrito;

CREATE TABLE articulo(
    id INT(12) NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    detalles VARCHAR(200) NOT NULL,
    img TEXT NOT NULL,
    preciocosto VARCHAR(200) NOT NULL,
    precioventa VARCHAR(200) NOT NULL,
    cantidadvendidos VARCHAR(200) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200) NOT NULL
);

ALTER TABLE articulo
    ADD PRIMARY KEY (id);

ALTER TABLE articulo
    MODIFY id INT(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
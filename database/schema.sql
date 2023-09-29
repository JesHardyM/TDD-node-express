CREATE DATABASE books_app;

USE books_app;

CREATE TABLE books(
    id int AUTO_INCREMENT PRIMARY KEY,
    title varchar(50) NOT NULL,
    author varchar(50) NOT NULL,
    book_description varchar(250) NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP );

INSERT into books(title,author,book_description)
VALUES ("100 años de soledad", "Gabriel García Marquez", "El mejor libro de la historia, un labarinto de personajes"),
("La Fiesta del Chivo", "Mario Vargas Llosa", "Relato del asesinato")

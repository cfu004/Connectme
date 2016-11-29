### Schema

CREATE DATABASE connect;
USE connect;

CREATE TABLE connect
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	age varchar(255),
    company varchar(255),
    position varchar(255),
		photo_url varchar(255),
	PRIMARY KEY (id)
);

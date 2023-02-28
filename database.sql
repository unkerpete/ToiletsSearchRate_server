-- High level view of the project's database/tables

CREATE DATABASE toilets_app;

CREATE TYPE bidet AS ENUM ('no', 'manual', 'automatic');
CREATE TYPE sex AS ENUM ('male', 'female', 'unisex');
CREATE TYPE role AS ENUM ('user', 'admin');

CREATE TABLE toilets(
  id SERIAL PRIMARY KEY,
  imgUrl VARCHAR(255) NOT NULL,
  _location VARCHAR(255) NOT NULL,
  sex sex NOT NULL,
  details VARCHAR(255) NOT NULL,
  bidet bidet NOT NULL,
  _address VARCHAR(255) NOT NULL,
  postalcode VARCHAR(255) NOT NULL
);

CREATE TABLE users(
  id SERIAL, -- did not find uuid necessary as we are using email as primary key
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE PRIMARY KEY NOT NULL,
  _password VARCHAR(255) NOT NULL,
  _role role DEFAULT 'user'
);
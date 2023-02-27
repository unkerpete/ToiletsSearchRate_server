-- High level view of the project's database/tables

CREATE DATABASE toilets_app;

CREATE TYPE bidet AS ENUM ('no', 'manual', 'automatic');
CREATE TYPE sex AS ENUM ('male', 'female');

CREATE TABLE toilets(
  id SERIAL PRIMARY KEY,
  imgUrl VARCHAR(255),
  region VARCHAR(50),
  _location VARCHAR(255),
  sex sex,
  details VARCHAR(255),
  bidet bidet,
  _address VARCHAR(255),
  postalcode VARCHAR(255)
);
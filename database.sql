-- High level view of the project's database/tables

CREATE DATABASE toilets_app;

CREATE TYPE bidet AS ENUM ('manual', 'automatic');
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
  postalcode VARCHAR(255) NOT NULL, -- original thinking when creating this table was to use this column later on for geolocation, but not required in the end.
  latitude VARCHAR(255) NOT NULL,
  longitude VARCHAR(255) NOT NULL
);

CREATE TABLE users(
  id SERIAL, -- did not find uuid necessary as we are using email as primary key
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE PRIMARY KEY NOT NULL,
  _password VARCHAR(255) NOT NULL,
  _role role DEFAULT 'user'
);

CREATE TABLE messages(
  id SERIAL PRIMARY KEY,
  users_username VARCHAR(50) UNIQUE NOT NULL,
  message VARCHAR(255) NOT NULL,
  toilets_id VARCHAR(255) NOT NULL,
  FOREIGN KEY (users_username) REFERENCES users (id),
  FOREIGN KEY (toilet_id) REFERENCES toilets (id)
);

CREATE TABLE ratings(
  id SERIAL PRIMARY KEY,
  liked BOOLEAN,
  toilets_id INT NOT NULL,
  users_username VARCHAR(255) NOT NULL,
  FOREIGN KEY (toilets_id) REFERENCES toilets (id),
  FOREIGN KEY (users_username) REFERENCES users (username),
  UNIQUE (toilets_id, users_username)
);


------------------------ toilets table data exported from beekeeper ---------------------------

INSERT INTO "toilets" ("_address", "_location", "bidet", "details", "id", "imgurl", "latitude", "longitude", "postalcode", "sex") 
VALUES 
  ('2 Serangoon Rd, #B1, Singapore 218227', 'Tekka Place', 'manual', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 4, 'https://iili.io/HVIVHWG.jpg', '1.305010809541936', '103.85137379426837', '1.305010809541936, 103.85137379426837', 'male')
  ('Serangoon Central, 23, Singapore 556083', 'NEX', 'manual', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 25, 'https://iili.io/HXnj4S4.png', '1.3508227585445807', '103.87203006427511', '1.3508227585445807, 103.87203006427511', 'female')
  ('1 Wallich St, Singapore 078881', 'Guoco Tower', 'manual', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 24, 'https://iili.io/HXnhQ6J.png', '1.2769939037538771', '103.84591761013588', '1.2769939037538771, 103.84591761013588', 'female')
  ('3 Gateway Dr, #B1 Westgate, Singapore 608532', 'Westgate', 'manual', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 26, 'https://iili.io/HXnwXse.png', '1.334575063036436', '103.74283722512354', '1.334575063036436, 103.74283722512354', 'female')
  ('1 Coleman St, Singapore 179803', 'The Adelphi', 'manual', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 23, 'https://iili.io/HXnhjj9.png', '1.291323938512667', '103.85117914644515', '1.291323938512667, 103.85117914644515', 'female')
  ('501 Orchard Rd, #B1, Singapore 238880', 'Wheelock Place', 'automatic', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 7, 'https://iili.io/HXnhQ6J.png', '1.3046930772182725', '103.83027197026449', '1.3046930772182725, 103.83027197026449', 'female')
  ('1 Coleman St, Singapore 179803', 'The Adelphi', 'manual', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 22, 'https://iili.io/HXnhjj9.png', '1.291323938512667', '103.85117914644515', '1.291323938512667, 103.85117914644515', 'male')
  ('79 Anson Road, #20, Singapore 079906', 'General Assembly', 'manual', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 2, 'https://iili.io/HVIVHWG.jpg', '1.2741997607329414', '103.84558768249352', '1.2741997607329414, 103.84558768249352', 'male')
  ('501 Orchard Rd, #B1, Singapore 238880', 'Wheelock Place', 'automatic', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 8, 'https://iili.io/HXnwLdv.png', '1.3046608687781158', '103.83064478569833', '1.3046608687781158, 103.83064478569833', 'male')
  ('29 South Bridge Rd, #01-01, Singapore 058665', 'Dopa Dopa Creamery', 'manual', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 6, 'https://iili.io/HXnj4S4.png', '1.2878852544682715', '103.84870060838658', '1.2878852544682715, 103.84870060838658', 'unisex')
  ('78 Airport Blvd., Singapore 819666', 'Jewel', 'automatic', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 30, 'https://iili.io/HXnNRpV.png', '1.3601772215698225', '103.98958813587947', '1.3601772215698225, 103.98958813587947', 'male')
  ('21 Choa Chu Kang Ave 4, Singapore 689812', 'Lot One', 'manual', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 28, 'https://iili.io/HXnwLdv.png', '1.385299235898295', '103.74493565491518', '1.385299235898295, 103.74493565491518', 'male')
  ('79 Anson Road, #20, Singapore 079906', 'General Assembly', 'manual', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 3, 'https://iili.io/HXnhjj9.png', '1.2740717125219692', '103.84582835648541', '1.2740717125219692, 103.84582835648541', 'female')
  ('999 Alexandra Rd, Singapore 159934', 'Test Location', 'automatic', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 12, 'https://iili.io/HVIVHWG.jpg', '1.3043390871221634', '103.82734030432457', '1.3043390871221634, 103.82734030432457', 'unisex')
  ('2 Serangoon Rd, #B1, Singapore 218227', 'Tekka Place', 'manual', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 5, 'https://iili.io/HXnhQ6J.png', '1.3050161620811631', '103.8515079077468', '1.3050161620811631, 103.8515079077468', 'female')
  ('Tanjong Pagar MRT, Tanjong Pagar MRT', 'Tanjong Pagar MRT', 'manual', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 1, 'https://iili.io/HVIVHWG.jpg', '1.2764198149341983', '103.84558276882595', '7RGW+J8 Singapore', 'male')
  ('78 Airport Blvd., Singapore 819666', 'Jewel', 'automatic', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 31, 'https://iili.io/HXnNRpV.png', '1.3601772215698225', '103.98958813587947', '1.3601772215698225, 103.98958813587947', 'female')
  ('10 Hospital Blvd, Singapore 168582', 'Singhealth Tower', 'automatic', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 32, 'https://iili.io/HXnNt3b.png', '1.277907143920484', '103.83562161258581', '1.277907143920484, 103.83562161258581', 'male');
CREATE DATABASE review_db;

\c review_db;

CREATE TABLE users (
  id bigserial,
  name text,
  photo text,
  PRIMARY KEY (id)
);

CREATE TABLE listings (
  id bigserial,
  name text,
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id bigserial,
  listing_id integer NOT NULL,
  user_id integer NOT NULL,
  accuracy DECIMAL(2,1) NOT NULL,
  communication DECIMAL(2,1) NOT NULL,
  cleanliness DECIMAL(2,1) NOT NULL, 
  location DECIMAL(2,1) NOT NULL,
  check_in DECIMAL(2,1) NOT NULL,
  _value DECIMAL(2,1) NOT NULL,
  _date timestamp NOT NULL,
  content text,
  is_reported boolean NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (listing_id) REFERENCES listings(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
DROP KEYSPACE IF EXISTS review_db;

CREATE KEYSPACE review_db

WITH replication = {'class':'SimpleStrategy','replication_factor':1};

USE review_db;

DROP TABLE IF EXISTS review_db;

CREATE TABLE reviews (
  listing_id int,
  listing_name text,
  review_id int,
  accuracy decimal,
  communication decimal,
  cleanliness decimal,
  location decimal,
  check_in decimal,
  value decimal,
  date text,
  content text,
  username text,
  photo text,
  PRIMARY KEY(listing_id, review_id)
);
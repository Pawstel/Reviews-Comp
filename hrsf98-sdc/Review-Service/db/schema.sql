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
  PRIMARY KEY (id),
  FOREIGN KEY (listing_id) REFERENCES listings(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

\c review_db;

COPY listings FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/combinedListing.txt' DELIMITER ',' CSV;
COPY users FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/users/user0.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review01.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review02.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review03.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review04.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review05.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review06.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review07.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review08.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review09.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review10.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review11.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review12.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review13.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review14.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review15.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review16.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review17.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review18.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review19.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review20.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review21.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review22.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review23.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review24.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review25.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review26.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review27.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review28.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review29.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review30.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review31.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review32.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review33.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review34.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review35.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review36.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review37.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review38.txt' DELIMITER ',' CSV;
COPY reviews FROM '/Users/blbb1111/documents/hrsf98/hrsf98-sdc/Review-Service/csvs/reviews/review39.txt' DELIMITER ',' CSV;

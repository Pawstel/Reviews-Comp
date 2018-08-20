var db = require('./config.js');

const getRatings = (listing_id, whenRatings) => {
  const qs = `SELECT accuracy, communication, cleanliness, location, check_in, _value FROM reviews WHERE listing_id = ${listing_id}`;

  db.query(qs, whenRatings);
}

const getReviews = (listing_id, whenReviews) => {
  const qs = `select users.name, users.photo, reviews._date, reviews.content FROM users JOIN reviews ON reviews.listing_id = ${listing_id} AND reviews.user_id = users.id ORDER BY reviews._date DESC;`;

  db.query(qs, whenReviews);
};

const postReview = (listingId, review, callback) => {
  const query = `INSERT INTO reviews (listing_id, user_id, _date, content) values (${listingId}, ${review.user_id}, '${review._date}', '${review.content}');`;
  db.query(query, callback);
};

module.exports = {
  getRatings: getRatings,
  getReviews: getReviews
}


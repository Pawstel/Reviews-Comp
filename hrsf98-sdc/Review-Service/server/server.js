
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/operations.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/pawstel/:id', express.static(path.join(__dirname, '/../client/dist')));

// app.get('/', (req, res) => res.send('Hello World!'));

app.get('/reviews_service/listing/overview/pawstel/:listingid', (req, res) => {
  const listing_id = Number(req.params.listingid);
  let ratingsObj = {};
  

  db.getRatings(listing_id, function(err, results) {
    if (err) {
      console.log('err in server - overview: ', err)
      return;
    }

    ratingsObj.total = results.length;
    ratingsObj.accuracy = Math.round((Math.random() * (4 - 1) + 1) * 2)/2;
    ratingsObj.communication = Math.round((Math.random() * (4 - 1) + 1) * 2)/2;
    ratingsObj.cleanliness = Math.round((Math.random() * (4 - 1) + 1) * 2)/2;
    ratingsObj.location = Math.round((Math.random() * (4 - 1) + 1) * 2)/2;
    ratingsObj.check_in = Math.round((Math.random() * (4 - 1) + 1) * 2)/2;
    ratingsObj._value = Math.round((Math.random() * (4 - 1) + 1) * 2)/2;
    ratingsObj.avg = Math.round(((ratingsObj.accuracy + ratingsObj.communication + ratingsObj.cleanliness + ratingsObj.location + ratingsObj.check_in + ratingsObj._value) / 6) * 2) /2; 
    // results.forEach(function(ratings) {
    //   ratingsObj.avg += ratings.accuracy;
    //   ratingsObj.accuracy += ratings.accuracy;
    //   ratingsObj.avg += ratings.communication;
    //   ratingsObj.communication += ratings.communication;
    //   ratingsObj.avg += ratings.cleanliness;
    //   ratingsObj.cleanliness += ratings.cleanliness;
    //   ratingsObj.avg += ratings.location;
    //   ratingsObj.location += ratings.location;
    //   ratingsObj.avg += ratings.check_in;
    //   ratingsObj.check_in += ratings.check_in;
    //   ratingsObj.avg += ratings._value;
    //   ratingsObj._value += ratings._value;
    //   console.log(ratings.accuracy);
    // });

    // ratingsObj.avg = Math.round((ratingsObj.avg/ (results.length * 6)) * 2) / 2;
    // ratingsObj.accuracy = Math.round((ratingsObj.accuracy / results.length) * 2) / 2;
    // ratingsObj.communication = Math.round((ratingsObj.communication / results.length) * 2) / 2;
    // ratingsObj.cleanliness = Math.round((ratingsObj.cleanliness / results.length) * 2) / 2;
    // ratingsObj.location = Math.round((ratingsObj.location / results.length) * 2) / 2;
    // ratingsObj.check_in = Math.round((ratingsObj.check_in / results.length) * 2) / 2;
    // ratingsObj._value = Math.round((ratingsObj._value / results.length) * 2) / 2;

    res.status(200).json(ratingsObj);
  });
});

app.get('/reviews_service/listing/reviews/pawstel/:listingid', (req, res) => {
  const listing_id = Number(req.params.listingid);

  db.getReviews(listing_id, function(err, results) {
    if (err) {
      console.log('err in server - reviews: ', err)
      return;
    }

    res.status(200).json(results);
  });
});

app.listen(3002, console.log('Listening on port 3002'));

module.exports = app;

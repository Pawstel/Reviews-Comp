require('newrelic');
const compression = require('compression');
// const redis = require('redis');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/operations.js');
// const redisServer = require('redis-server');
// const REDIS_PORT = process.env.REDIS_PORT;
// const client = redis.createClient();
// const server = new redisServer(process.env.REDIS_PORT);



const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/pawstel/:id', express.static(path.join(__dirname, '/../client/dist')));

// app.get('/', (req, res) => res.send('Hello World!'));

app.get('/reviews_service/listing/overview/pawstel/:listingid', (req, res) => {

  // let isbn = req.query.isbn;
  // client.get(isbn, (err, result) => {
    // if (result) {
    //   res.send(result);
    // } else {
      const listing_id = Number(req.params.listingid);
      let ratingsObj = {};

      db.getRatings(listing_id, function(err, results) {
        if (err) {
          console.log('err in server - overview: ', err)
          return;
        }

        ratingsObj.total = results.length;

        ratingsObj.accuracy = results.rows.reduce((accum, elem) => {
          return accum + Number(elem.accuracy);
        }, 0) / results.rows.length;
        ratingsObj.communication = results.rows.reduce((accum, elem) => {
          return accum + Number(elem.communication);
        }, 0) / results.rows.length;
        ratingsObj.cleanliness = results.rows.reduce((accum, elem) => {
          return accum + Number(elem.cleanliness);
        }, 0) / results.rows.length;
        ratingsObj.location = results.rows.reduce((accum, elem) => {
          return accum + Number(elem.location);
        }, 0) / results.rows.length;
        ratingsObj.check_in = results.rows.reduce((accum, elem) => {
          return accum + Number(elem.check_in);
        }, 0) / results.rows.length;
        ratingsObj._value = results.rows.reduce((accum, elem) => {
          return accum + Number(elem._value);
        }, 0) / results.rows.length;

        ratingsObj.avg = Math.round(((ratingsObj.accuracy + ratingsObj.communication + ratingsObj.cleanliness + ratingsObj.location + ratingsObj.check_in + ratingsObj._value) / 6) * 2) /2; 

        res.status(200).json(ratingsObj);
      });
  //   };
  // });
});

app.get('/reviews_service/listing/reviews/pawstel/:listingid', (req, res) => {
  // let isbn = req.query.isbn;
  // client.get(isbn, (err, result) => {
  //   if (result) {
  //     res.send(result);
  //   } else {

      console.log('reviews!');
      const listing_id = Number(req.params.listingid);

      db.getReviews(listing_id, function(err, results) {
        if (err) {
          console.log('err in server - reviews: ', err)
         return;
       }
       res.status(200).json(results.rows);
      });
  //   }
  // });
});

app.put('/reviews_service/listing/update/pawstel/:listingid/:review', (req, res) => {
  console.log('PUT!');
  const listing_id = Number(req.params.listingid);

  res.status(200).json('')
});

app.delete('/reviews_service/listing/delete/pawstel/:listingid/:review', (req, res) => {
  console.log('Delete!');
  const listing_id = Number(req.params.listingid);

  res.status(200).json('')
});

app.listen(3002, console.log('Listening on port 3002'));

module.exports = app;

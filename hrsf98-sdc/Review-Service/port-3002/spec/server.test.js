const request = require('supertest');
const app = require('../server/server.js');

describe('Overview Path Tests', () => {
  test('It should respond to get request with a 200 status code', (done) => {
    request(app).get('/api/listing/5/overview').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('It should return an object', (done) => {
    request(app).get('/api/listing/5/overview').then((response) => {
      expect(typeof response.body._value).toEqual('number');
      done();
    });
  });

});

describe('Reviews Path Tests', () => {
    test('It should respond to get requests with a 200 status code', (done) => {
      request(app).get('/api/listing/5/reviews').then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
});
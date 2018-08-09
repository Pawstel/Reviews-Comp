
const pg = require('pg');

const dbString = "postgresql://localhost/review_db"

let db = new pg.Client(dbString);
db.connect();

module.exports = db;

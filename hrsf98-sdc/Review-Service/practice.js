const db = require('./database/config.js');
var fs = require('fs');
let string = ''

for (let i = 0; i < 5000000; i++) {

  string += `${i + 1}, a', 'c'` + '\n';

  string += `${dataObj} `
  // let string = `INSERT INTO users(name, photo) VALUES ('${'a'}', '${'b'}')`;
  // console.log(i);

  // db.query(string, function(err) {
  //   if(err) {
  //       console.log(err);
  //       return;
  //   } else {

  //   }
  // });
}
fs.writeFileSync('writeMe0.txt', string);
string = ''

for (let i = 5000000; i < 10000000; i++) {

  string += `${i + 1}, a', 'c'` + '\n';

  // let string = `INSERT INTO users(name, photo) VALUES ('${'a'}', '${'b'}')`;
  // console.log(i);

  // db.query(string, function(err) {
  //   if(err) {
  //       console.log(err);
  //       return;
  //   } else {

  //   }
  // });
}

fs.writeFileSync('writeMe1.txt', string);

db.queru(`COPY "users" FROM '/Users/blbb1111/writeMe1.txt' DELIMITER ',' CSV HEADER`)


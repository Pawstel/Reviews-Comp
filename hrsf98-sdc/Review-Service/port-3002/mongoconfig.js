
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number,
  login: String,
  repos_url: String,
  updated_at: Date
});

let Repo = mongoose.model('Repo', repoSchema);
let save = (mongoReqs) => {
  var repos = mongoReqs.map(function(element, index) {
    return (new Repo(element));
  });
  // console.log(repos);
  for (var i = 0; i < repos.length; i++) {
    repos[i].save();
  };
};

let getData = (username, cb) => {
  if(username.length > 0) {

    return  Repo.find({'login':username}).sort({updated_at:-1}).limit(25).exec(cb);

  } else {

    return  Repo.find({}).sort({updated_at:-1}).limit(25).exec(cb);
  }
}

module.exports.save = save;
module.exports.getData = getData;
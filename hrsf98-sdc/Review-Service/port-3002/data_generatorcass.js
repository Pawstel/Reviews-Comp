
const axios = require('axios');
const fs = require('fs');
const download = require('image-downloader');
const XMLParser = require('xml-js');
const DateGen = require('random-date-generator');
const loremIpsum = require('lorem-ipsum');
const db = require('./database/config.js');

let userId = 1;
let listingId = 1;
let reviewId = 1;
let userString = '';
let listingString = '';
let reviewString = '';
let userCalled = 0;
let listingCalled = 0;
let reviewCalled = 0;
let reviewUser = 0;
let reviewUserCalled = 0;

const getPhotos = () => {
  var origUrls = [];

  for (var i = 0; i < 20; i++) {
    var promise = new Promise ((resolve, reject) => {
      axios.get('https://dog.ceo/api/breeds/image/random')
      .then(function(response) {
        resolve(response.data.message);
      })
      .catch(function(err) {
        reject(err);
      })
    });

    origUrls.push(promise);
  }

  Promise.all(origUrls).then(function(urlArr) {
    urlArr.forEach(function(url) {
      const options = {
        url: url,
        dest: './user_images'
      }

      download.image(options)
      .then((filename, image) => {
        console.log('file saved to ', filename)
      })
      .catch((err) => {
        console.log(err);
      })
    });
  })
}

const getAWSPhotos = () => {
  var urlArr = [];
  var accURLArr;

  axios.get('http://adamdogpics.s3.amazonaws.com')
  .then(function(response) {
    console.log(typeof response.data);
    var urls = XMLParser.xml2json(response.data, {compact: true, spaces: 4});
    urls = JSON.parse(urls);
    urls = urls.ListBucketResult.Contents.map(function(content) {
      return content.Key
    });
    urls = urls.map(function(obj) {
      return obj._text;
    })
    urls = urls.map(function(file) {
      return 'https://s3-us-west-1.amazonaws.com/adamdogpics/' + file;
    })

    var mid = Math.floor(urls.length/2);
    console.log(urls.slice(0, mid));
    console.log(urls.slice(mid));
    

    // urls = urls.map(function(obj) {
    //   return obj["_text"];
    // })

  })
  .catch(function(err) {
    console.log('err: ', err);
  });
}

const insertUsers = () => {
  

  for (var i = 0; i < 3000000; i++) {
    //write query here
    // qs = `INSERT INTO users (name, photo) VALUES ('${names[i]}', '${photos[i]}')`;
    // db.query(qs, function(err) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    // });
    userString += `${userId}, ${names[Math.ceil(names.length * Math.random() - 1)]}, ${photos[Math.ceil(photos.length * Math.random() - 1)]} \n`
    userId++;
  }
  fs.writeFileSync(`./csvs/users/user${userCalled}.txt`, userString);
  userString = '';
  userCalled++;
}

const getContent = () => {
  var finalArr = [];
  let declaratives = ['Wow', 'Did me a frighten', 'mlem', 'blep', 'slept on tha sofa', '10/10', 'Listen frien', 'Amaze', 'lol', 'Host is good boy', 'OMG', 'Did me a concern', 'Remain calm!', 'v happy', 'best pupdate', 'Heckin big shower']
  let adjectives = ['Such', 'So', 'Many', 'Much', 'Heckin awesome'];
  let perks = ['pad', 'location', 'lighting', 'comfort', 'opulent', 'classy', 'decor'];
  let verbs = ['sploot', 'bork', 'fluff', 'boop', 'boof'];
  let declarativeNum = Math.floor(Math.random() * (declaratives.length - 5) + 5);
  let phraseNum = Math.floor(Math.random() * (verbs.length - 3 ) + 3);
  let wouldIndex = Math.floor(Math.random() * verbs.length);
  let curAdjective;
  let curPerk

  let oneInTen =  Math.floor(Math.random() * (10 - 1) + 1);
  let oneInTwo = Math.floor(Math.random() * (2 - 1) + 1);

  if (oneInTen === 5) {
    if (oneInTwo === 1) {
      return 'Ball '.repeat(35);
    } else {
      return 'Cat '.repeat(35);
    }
  }

  while (declarativeNum > 0) {
    finalArr.push(declaratives.splice(Math.floor(Math.random() * (declaratives.length)), 1).pop())
    declarativeNum--;
  }

  while (phraseNum > 0) {
    curAdjective = adjectives.splice(Math.floor(Math.random() * (adjectives.length)), 1).pop();
    curPerk = perks.splice(Math.floor(Math.random() * (perks.length)), 1).pop();
    finalArr.push(curAdjective + ' ' + curPerk);
    phraseNum--;
  }

  finalArr.push('Would ' + verbs[wouldIndex] + ' again');


  finalArr = shuffle(finalArr);
  return finalArr.join('. ');
}

const shuffle = (arr) => {
  var temp;
  var rando;

  for (var i = arr.length - 1; i >= 0; i--) {
    rando = Math.floor(Math.random() * arr.length);
    temp = arr[i];
    arr[i] = arr[rando];
    arr[rando] = temp;
  }

  return arr;
}

const getRating = () => {
  return Math.round((Math.random() * (4 - 1) + 1) * 2)/2;
}

const getDate = () => {
  let start = new Date (2011, 1, 1);
  let end = new Date ();

  var randoDate = DateGen.getRandomDateInRange(start, end);
  return randoDate.toISOString().slice(0, 19).replace('T', ' ');
};

const getReview = () => {
    let returnObj = {};
    returnObj.accuracy = getRating();
    returnObj.communication = getRating();
    returnObj.cleanliness = getRating();
    returnObj.location = getRating();
    returnObj.check_in = getRating();
    returnObj._value = getRating();
    returnObj.date = getDate();
    returnObj._content = getContent();

    return returnObj;
}

const getUsers = () => {
    let numOfRev = Math.floor(Math.random() * (30 - 1) + 3);
    let total_user_ids = [];
    let user_ids =[];
    for (let i = 1; i <= 40; i++) {
      total_user_ids.push(i);
    }

    for (let i = 0; i < numOfRev; i++) {
      let randIndex = total_user_ids.splice(Math.floor(Math.random() * total_user_ids.length), 1).pop();
      user_ids.push(randIndex);
    }

    return user_ids;
} 

const insertReviews = () => {
  let qs;
  let listings = getListing();
  const names = [
    'PetitAnge',
    'ChooChoo',
    'Horshack',
    'Salsa',
    'Cassie',
    'Whisper',
    'Junior',
    'Monty',
    'Stinky',
    'Dante',
    'Sooner',
    'Neutron',
    'Gusto',
    'Quixote',
    'Escapade',
    'Jazz',
    'Angus',
    'Tarragon',
    'Macho',
    'Jazz',
    'Brando',
    'Asset',
    'Soueee',
    'Delta',
    'Catalina',
    'Grover',
    'Valentino',
    'Zephyr',
    'Blackie',
    'Sparrow',
    'Rotten',
    'Bandit',
    'Birdy',
    'Wildwood',
    'Truffles',
    'Zoe',
    'Ricotta',
    'Baxter',
    'Portly',
    'Ebi',
    'Mole',
    'Falcon',
    'Ginger',
    'Babushka',
    'Capo',
    'Blotto',
    'Maggie',
    'Kosmic',
    'Asylum',
    'Furr',
    'BamBam',
    'Boss',
    'Ralph',
    'Yule',
    'Caribou',
    'Knickerbocker',
    'Elsa',
    'Brie',
    'Marshmallow',
    'ChaCha',
    'Rambo',
    'Sweetness',
    'Tinkerbell',
    'Panther',
    'Ray',
    'Ricotta',
    'Furr',
    'Gertrude',
    'Brownie',
    'Alfalfa',
    'Anais',
    'Mustang',
    'Lamborghini',
    'Web',
    'Laser',
    'Gatekeeper',
    'Sam',
    'Benebop Cumberfloof',
    'Dweeb',
    'Mongoose',
    'Braindead',
    'Thistle',
    'Chocolate',
    'Bamboozler',
    'Hugo',
    'Shah',
    'Ammo',
    'Linus',
    'Shrimp',
    'Knickerbocker',
    'Queeny',
    'Marlboro',
    'Butterball',
    'Pretty',
    'Casanova',
    'Poindexter',
    'Tissot',
    'Chester',
    'Joker',
    'Sly',
    'Spitfire',
    'Blue',
    'Moet',
    'Buzz',
    'Viva',
    'Sugarbaker',
    'Chiffon',
    'Quasimodo',
    'Condor',
    'Baron',
    'Sherlock',
    'Candy',
    'Lashes',
    'PitStop',
    'Trouper',
    'Sniffer',
    'Wagalot',
    'TerraCotta',
    'Geekie',
    'Zooey',
    'Inky',
    'Caleb',
    'Hefty',
    'Tomba',
    'Ghiradelli',
    'Astro',
    'Sashimi',
    'Bandito',
    'Ludwig',
    'Elvira',
    'Melody',
    'Shiksa',
    'Nightmare',
    'Tissot',
    'TomTom',
  ];

  const photos = [
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/1.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/2.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/3.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/4.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/5.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/6.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/7.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/8.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/9.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/10.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/11.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/12.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/13.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/14.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/15.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/16.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/17.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/18.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/19.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/20.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/21.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/22.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/23.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/24.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/25.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/26.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/27.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/28.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/29.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/30.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/31.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/32.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/33.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/34.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/35.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/36.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/37.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/38.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/39.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/40.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/41.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/42.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/43.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/44.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/45.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/46.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/47.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/48.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/49.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/50.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/51.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/52.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/53.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/54.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/55.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/56.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/57.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/58.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/59.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/60.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/61.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/62.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/63.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/64.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/65.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/66.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/67.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/68.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/69.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/70.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/71.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/72.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/73.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/74.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/75.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/76.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/77.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/78.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/79.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/80.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/81.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/82.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/83.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/84.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/85.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/86.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/87.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/88.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/89.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/90.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/91.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/92.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/93.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/94.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/95.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/96.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/97.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/98.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/99.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/100.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/101.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/102.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/103.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/104.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/105.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/106.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/107.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/108.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/109.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/110.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/111.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/112.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/113.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/114.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/115.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/116.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/117.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/118.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/119.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/120.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/121.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/122.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/123.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/124.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/125.jpeg',
    'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/126.jpeg'
  ]
  // changed so instead of creating users 10M times, create more users
  // while (reviewUser < 10) {
  //   for (let i = 1; i <= 1000000; i++) {
  //       let review = getReview();
  //       reviewString += `${reviewId}, ${listings[reviewId]}, ${reviewId}, ${review.accuracy}, ${review.communication}, ${review.cleanliness}, ${review.location}, ${review.check_in}, ${review._value}, ${review.date}, ${review._content}, ${names[Math.ceil(names.length * Math.random() - 1)]}, ${photos[Math.ceil(photos.length * Math.random() - 1)]} \n`
  //       reviewId++;
  //   }
  //   fs.writeFileSync(`./csvs/reviews/review${reviewUser}.txt`, reviewString);
  //   reviewString = '';
  //   reviewUser++;
  // }


  while (reviewCalled < 30) {
    for (let i = 1; i <= 1000000; i++) {
        let review = getReview();
        let listing_id = Math.floor(Math.random() * Math.random() * 10000000) + 1
        reviewString += `${listing_id}, ${listings[listing_id]}, ${reviewId}, ${review.accuracy}, ${review.communication}, ${review.cleanliness}, ${review.location}, ${review.check_in}, ${review._value}, ${review.date}, ${review._content}, ${names[Math.ceil(names.length * Math.random() - 1)]}, ${photos[Math.ceil(photos.length * Math.random() - 1)]} \n`
        reviewId++;
    }
    fs.writeFileSync(`./csvs/reviews/review${reviewCalled + 10}.txt`, reviewString);
    reviewString = '';
    reviewCalled++;
  }


  // for (let i = 1; i <= 5000000; i++) {
  //   let users = getUsers();
  //   let listing_id = i;
  //   users.forEach(function(user) {
  //     let review = getReview();
  //     review.listing_id = listing_id;
  //     review.user_id = user;

  //     qs = `INSERT INTO reviews (listing_id, user_id, accuracy, communication, cleanliness, location, check_in, \
  //           _value, _date, content) \
  //           VALUES ('${review.listing_id}', '${review.user_id}', '${review.accuracy}', '${review.communication}', \
  //            '${review.cleanliness}', '${review.location}', '${review.check_in}', '${review._value}', '${review.date}', '${review._content}')`;

  //     db.query(qs, function(err) {
  //         if(err) {
  //             console.log(err);
  //             return;
  //         }
  //     });
  //   });
  // }


};

const insertListings = () => {
    
    while (listingCalled < 10) {
        let listings = [];
        for (let i = 0; i < 1000000; i++) {
            let listing = loremIpsum({units: 'sentences'});
            listings.push(listing);
        }

    for (let i = 0; i < listings.length; i++) {
      // qs = `INSERT INTO listings (name) VALUES ('${listings[i]}')`;
      //   db.query(qs, function(err) {
      //       if (err) {
      //           console.log(err);
      //           return;
      //       }
      //   })
      listingString += `${listingId}, ${listings[i]} \n`;
      listingId++
    }
  fs.writeFileSync(`./csvs/listing${listingCalled}.txt`, listingString);
  listingString = '';
  listingCalled++;
    }
    
};

const getListing = function () {
    const prefixes = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Madam', 'Master', 'Prince', 'Princess', 'Duke', 'Baron'];

    const firstNames = ['Demarcus', 'Rose', 'Curtis', 'Dean', 'Neil', 'Hortense', 'Ines', 'Kariane', 'Darrick', 'Yesenia', 'Constance', 'Cicero', 'Angelina', 'Roosevelt', 'Julia', 'Mark', 'Zakary', 'Ernestina', 'Darlene', 'Cleve', 'John', 'Roberta', 'Edythe', 'Jonatan', 'Joan', 'Summer', 'Berniece', 'Marcelina', 'Dejon', 'Sydnie', 'Malvina', 'Royal', 'Eula', 'Jannie', 'Felicity', 'Randall', 'Jovanny', 'Breana', 'Berenice', 'Earnest', 'Chris', 'Yvette', 'Miller', 'Else', 'Cali', 'Monty', 'Donald', 'Camille', 'Jadon', 'Sharon', 'Jordane', 'Timothy', 'Ron', 'Colby', 'Emery', 'Rusty', 'Brendon', 'Kacey', 'Drake', 'Joelle', 'Alfred', 'Raleigh', 'Arlo', 'Camille', 'Giles', 'Kariane', 'Adelle', 'Lucinda', 'Rickie', 'Darien', 'Rod', 'Kassandra', 'Rosanna', 'Melyssa', 'Amari', 'Arne', 'Efrain', 'Nicole', 'Gordon', 'Isobel', 'Karli', 'Josue', 'Tanya', 'Amber', 'Earnestine', 'Catharine', 'Anabelle', 'Kristy', 'Elise', 'Lance', 'Marvin', 'Christophe', 'Paul', 'Phoebe', 'Carlotta', 'Robbie', 'Dave', 'Zula', 'Yadira', 'Holly'];

    const lastNames = ['Farrells', 'DuBuques', 'Kiehns', 'Swaniawskis', 'Markss', 'Murrays', 'Wests', 'Leschs', 'Kautzers', 'Rippins', 'McClures', 'Nicolass', 'Beers', 'Roobs', 'Thiels', 'Boscos', 'Kuvaliss', 'Quitzons', 'Doyles', 'Fadels', 'Gislasons', 'Kassulkes', 'Haleys', 'Runtes', 'Monahans', 'Goldners', 'Hyatts', 'Wolffs', 'Beattys', 'Tromps', 'Friesens', 'Mertzs', 'Rolfsons', 'Wills', 'Simoniss', 'Nikolauss', 'Kleins', 'Mosciskis', 'Rosenbaums', 'McKenzies', 'Yosts', 'Powlowskis', 'Cummeratas', 'Lefflers', 'Baileys', 'Kesslers', 'Keelings', 'Daviss', 'Corkerys', 'Doyles', 'Feests', 'Champlins', 'Bashirians', 'Stokess', 'Schadens', 'Effertzs', 'Robertss', 'Stoltenbergs', 'Dickenss', 'Simoniss', 'Carters', 'DAmores', 'VonRuedens', 'Dibberts', 'Bergnaums', 'Hageness', 'McClures', 'Mayerts', 'Heathcotes', 'Bogans', 'Dachs', 'Hyatts', 'Buckridges', 'Stoltenbergs', 'Oberbrunners', 'Abshires', 'Grahams', 'Gulgowskis', 'Boyers', 'Lemkes', 'Schroeders', 'Donnellys', 'Pfeffers', 'Starks', 'Williamsons', 'Greenfelders', 'Weissnats', 'Hamills', 'Walkers', 'Schmelers', 'Haleys', 'Zemlaks', 'Tromps', 'Ziemanns', 'Wuckerts', 'Hartmanns', 'Grahams', 'Shanahans', 'Bergstroms', 'Mertzs'];

    const locations = ['Ashy Pawstel', 'Black Pawstel', 'Blue Pawstel', 'Gray Pawstel', 'Green Pawstel', 'Icy Pawstel', 'Lemon Pawstel', 'Mango Pawstel', 'Orange Pawstel', 'Purple Pawstel', 'Red Pawstel', 'Salmon Pawstel', 'White Pawstel', 'Yellow Pawstel', 'Agreeable Pawstel', 'Ambitious Pawstel', 'Brave Pawstel', 'Calm Pawstel', 'Delightful Pawstel', 'Eager Pawstel', 'Faithful Pawstel', 'Gentle Pawstel', 'Happy Pawstel', 'Jolly Pawstel', 'Kind Pawstel', 'Lively Pawstel', 'Nice Pawstel', 'Obedient Pawstel', 'Polite Pawstel', 'Proud Pawstel', 'Silly Pawstel', 'Thankful Pawstel', 'Victorious Pawstel', 'Witty Pawstel', 'Wonderful Pawstel', 'Zealous Pawstel', 'Big Pawstel', 'Colossal Pawstel', 'Fat Pawstel', 'Gigantic Pawstel', 'Great Pawstel', 'Huge Pawstel', 'Immense Pawstel', 'Large Pawstel', 'Little Pawstel', 'Mammoth Pawstel', 'Massive Pawstel', 'Microscopic Pawstel', 'Miniature Pawstel', 'Petite Pawstel', 'Puny Pawstel', 'Scrawny Pawstel', 'Short Pawstel', 'Small Pawstel', 'Tall Pawstel', 'Teeny Pawstel', 'Tiny Pawstel', 'Ancient Pawstel', 'Brief Pawstel', 'Early Pawstel', 'Fast Pawstel', 'Futuristic Pawstel', 'Late Pawstel', 'Long Pawstel', 'Modern Pawstel', 'Old Pawstel', 'Old-fashioned Pawstel', 'Prehistoric Pawstel', 'Quick Pawstel', 'Rapid Pawstel', 'Short Pawstel', 'Slow Pawstel', 'Swift Pawstel', 'Young Pawstel', 'Breezy Pawstel', 'Cool Pawstel', 'Cuddly Pawstel', 'Damp Pawstel', 'Fluffy Pawstel', 'Warm Pawstel', 'Wooden Pawstel', 'Acidic Pawstel', 'Bitter Pawstel', 'Cool Pawstel', 'Creamy Pawstel', 'Delicious Pawstel', 'Disgusting Pawstel', 'Fresh Pawstel', 'Greasy Pawstel', 'Juicy Pawstel', 'Hot Pawstel', 'Moldy Pawstel', 'Nutritious Pawstel', 'Nutty Pawstel', 'Putrid Pawstel', 'Rancid Pawstel', 'Ripe Pawstel', 'Rotten Pawstel', 'Salty Pawstel', 'Savory Pawstel'];
    let array = [''];
  for (let i = 0; i < prefixes.length; i += 1) {
    for (let j = 0; j < firstNames.length; j += 1) {
      for (let k = 0; k < lastNames.length; k += 1) {
        for (let l = 0; l < 100; l += 1) {
          // const randHost = Math.ceil(Math.random() * 10000000);
          // const randUser = Math.ceil(Math.random() * 10000000);
          // const randStay = Math.ceil(Math.random() * 10);
          // const randViews = 100 + Math.ceil(Math.random() * 500);
          // const randGuests = 1 + Math.ceil(Math.random() * 5);
          // const randFees = 2 + Math.ceil(Math.random() * 8);
          // const randTax = Math.ceil(Math.random() * 10);
          // const randRate = 60 + Math.ceil(Math.random() * 100);
          array.push(`${prefixes[i]} ${firstNames[j]} ${lastNames[k]} ${locations[l]}`)
        }
      }
    }
  }
  return array;
}
// insertUsers();
// insertListings();
// console.log(listings)
insertReviews();

db.end();
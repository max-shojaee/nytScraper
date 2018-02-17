var scrape = require("../public/scripts/scrape");
var makeDate = require("../public/scripts/date");

var Headline = require("../models/headline");

module.exports = {
  fetch: function(cb) {

    scrape(function(data) {

      var articles = data;
 
      for (var i = 0; i < articles.length; i++) {
        articles[i].date = makeDate();
        articles[i].saved = false;
        console.log(articles[i]);
      }

      Headline.collection.insertMany(articles, { ordered: false }, function(err, docs) {
        console.log("Error is: " + err);
        cb(err, docs);
      });
    });
  },
  delete: function(query, cb) {
    Headline.remove(query, cb);
  },
  get: function(query, cb) {
   
    Headline.find(query)
      .sort({
        _id: -1
      })

      .exec(function(err, doc) {
   
        cb(doc);
      });
  },
  update: function(query, cb) {
 
    Headline.update({ _id: query._id }, {
      $set: query
    }, {}, cb);
  }
};

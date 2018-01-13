var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request")
var cheerio = require("cheerio")
var axios = require("axios");

var db = require("./models");

var app = express();
var PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));



mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/ny_times_db', {
    useMongoClient: true
});

/// Scrape articles from NY Times and push into database ///
app.get("/scrape", function (req, res) {
    axios.get("http://www.nytimes.com").then(function (response) {

        var $ = cheerio.load(response.data);

        $("h2.story-heading").each(function (i, element) {

            var result = {};

            result.headline = $(this)
                .children()
                .text();
            result.url = $(this)
                .children("a")
                .attr("href");

            db.article
                .create(result)
                .then(function (dbarticles) {
                    res.send("Scrape Complete");
                })
                .catch(function (err) {
                    res.json(err);
                });
        });
    });
});

/// Get all the articles we have pushed into the database ///
app.get("/articles", function (req, res) {

    db.article
        .find({})
        .then(function (dbarticle) {
            res.json(dbarticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

/// Save an article to our "favorite" list /// 
app.post("/savedarticles", function (req, res) {


});

/// Create a comment on article of user choice /// 
app.get("/articles/:id", function (req, res) {

    db.article
        .findById(req.params.id)
        .populate("comment")
        .then(function (dbarticle) {
            res.json(dbarticle);
        })
        .catch(function (err) {
            res.json(err);
        });
})

/// Save the comment on the article of user choice /// 
app.post("/articles/:id", function (req, res) {

    db.comment
        .create(req.body)
        .then(function (dbcomment) {
            return db.article.findOneAndUpdate({ _id: req.params.id }, { comment: dbcomment._id }, { new: true });
        })
        .then(function (dbarticle) {
            res.json(dbarticle);
        })
        .catch(function (err) {
            res.json(err);
        });
})


app.listen(PORT, function () {
    console.log("Listening on port", PORT);
});
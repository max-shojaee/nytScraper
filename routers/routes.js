var headlinesController = require("./headlines");
var notesController = require("./notes");

module.exports = function(router) {
 
  router.get("/", function(req, res) {
    res.render("home");
  });

  router.get("/saved", function(req, res) {
    res.render("saved");
  });

  router.get("/api/fetch", function(req, res) {
 
    headlinesController.fetch(function(err, docs) {

      //if (!docs || docs.insertedCount === 0) {
      if (!docs) {
        res.json({
          message: "No new articles today. Check back tomorrow!"
        });
      }
      else {
        res.json({
          message: "Added " + docs.insertedCount + " new articles!"
        });
      }
    });
  });

  router.get("/api/headlines", function(req, res) {

    headlinesController.get(req.query, function(data) {

      res.json(data);
    });
  });

  router.delete("/api/headlines/:id", function(req, res) {

    var query = { _id: req.params.id };

      headlinesController.delete(query, function(err, data) {
   
      res.json(data);
    });
  });

  router.put("/api/headlines", function(req, res) {
  
    headlinesController.update(req.body, function(err, data) {
 
      res.json(data);
    });
  });

  router.get("/api/notes/", function(req, res) {

    notesController.get({}, function(err, data) {

      res.json(data);
    });
  });

  router.get("/api/notes/:headline_id", function(req, res) {
    var query = { _id: req.params.headline_id };

     notesController.get(query, function(err, data) {
   
      res.json(data);
    });
  });

  router.delete("/api/notes/all", function(req, res) {

      notesController.deleteAll(function(err, data) {
   
      res.json(data);
    });
  });


  router.post("/api/notes", function(req, res) {
    notesController.save(req.body, function(data) {

      res.json(data);
    });
  });
};
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Connect to db
mongoose.connect('mongodb://localhost/tourapp');
let db = mongoose.connection;

//Check connection
db.once('open', function () {
  console.log('Connected to DB');
});
//Check for DB errors
db.on('error', function (err) {
  console.log(err);
});


//Import Models
let Tour = require('./models/tour');

//Init app
const app = express();


//load pug engine
app.set('views', "./views");
app.set('view engine', 'pug');


//Body-Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Public files
app.use(express.static('public'));


//home route
app.get('/', function (req, res) {
  Tour.find({}, function (err, tours) {
    if(err){
      console.log(err);
    } else {
      res.render('index', {
        title : 'Tours Page',
        tours: tours
      });
    }
  })
});

//add GET route
app.get('/tours/add', function (req, res) {
  res.render('add_tour', {
    title : "Add Tour"
  });
})

//Get Single Tour
app.get('/tour/:id', function (req, res) {
  Tour.findById(req.params.id, function (err, tour) {
    if(err){
      console.log(err);
    } else {
      res.render('tour', {
        tour: tour
      });
    }
  });
});

//Edit Tour form
app.get('/tour/edit/:id', function (req, res) {
  Tour.findById(req.params.id, function (err, tour) {
    if(err){
      console.log(err);
    } else {
      res.render('edit_tour', {
        title: "Edit Tour",
        tour: tour
      });
    }
  });
});

//Update Tour
app.post('/tours/edit/:id', function (req, res) {
  let tour = {};
  tour.title = req.body.title;
  tour.company = req.body.company;
  tour.body = req.body.body;

  let query = {
    _id: req.params.id
  }

  Tour.update(query, tour, function (err) {
    if(err){
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });

});

//Delete Tour
app.delete('/tour/:id',  function (req, res) {
  let query = {_id : req.params.id};

  Tour.deleteOne(query, function (err) {
    if(err){
      console.log(err);
    } else {
      res.send('Success');
    }
  });
});

//POST route
app.post('/tours/add', function (req, res) {

  let tour = new Tour();
  tour.title = req.body.title;
  tour.company = req.body.company;
  tour.body = req.body.body;

  tour.save(function (err) {
    if(err){
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });

});

//start server
app.listen(3000, function () {
  console.log('server started on port 3000...');
})

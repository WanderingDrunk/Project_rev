var express = require('express');
var router = express.Router();
var booking = require('../models/booking')


/* GET create booking page. */
router.get('/', function(req, res, next) {
  res.render('create-booking')
})

router.post('/view-booking', function(req, res, next) {
  var name = req.body.name;
  var ws_date = req.body.ws_date;
  var ws_time = req.body.ws_time;
  var date_booked = req.body.date_booked;

  var bookingthing = new booking ({
    name,
    ws_date,
    ws_time,
    date_booked
  });
  bookingthing.save((err) =>{
    if(err){
      console.log("Something went wrong trying to save the data to the database")
    }else{
      console.log("Data Recorded succesfully")
    }
  })
})

module.exports = router;
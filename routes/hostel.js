var express = require("express");
var router  = express.Router();
var Hostel = require("../models/hostel");
var Hostel_f = require("../models/hostel_f");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/",middleware.isLoggedIn, function(req, res){
    // Get all campgrounds from DB
    if(res.locals.currentUser.gender == 'M')
    {
      Hostel.find({}, function(err, allHostels){
       if(err){
           console.log(err);
       } else {
          res.render("../views/Hostels/index",{hostels: allHostels});
       }
      });
    }else{
      Hostel_f.find({}, function(err, allHostels){
       if(err){
           console.log(err);
       } else {
          res.render("../views/Hostels/index_f",{hostels: allHostels});
       }
      });
    }
    
});

router.post("/filter",middleware.isLoggedIn ,function(req,res){
  bed = req.body.beds;
  Hostel.find({beds: bed}, function(err, allHostels){
       if(err){
           console.log(err);
       } else {
          console.log(allHostels);
          res.render("../views/Hostels/index",{hostels: allHostels});
       }
      });
})


// SHOW - shows more info about one campground
router.get("/:id", middleware.isLoggedIn ,function(req, res){
    //find the campground with provided ID
    if(res.locals.currentUser.gender == 'M')
    {
      Hostel.findById(req.params.id).populate("comments").exec(function(err, foundHostel){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("../views/Hostels/show", {hostel: foundHostel});
        }
      });  
    }else{
      Hostel_f.findById(req.params.id).populate("comments").exec(function(err, foundHostel){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("../views/Hostels/show", {hostel: foundHostel});
        }
      });  
    }
    
});

module.exports = router;


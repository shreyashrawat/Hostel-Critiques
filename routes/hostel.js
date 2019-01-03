var express = require("express");
var router  = express.Router();
var Hostel = require("../models/hostel");

//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Hostel.find({}, function(err, allHostels){
       if(err){
           console.log(err);
       } else {
          res.render("../views/Hostels/index",{hostels: allHostels});
       }
    });
});


// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Hostel.findById(req.params.id).populate("comments").exec(function(err, foundHostel){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("../views/Hostels/show", {hostel: foundHostel});
        }
    });
});

module.exports = router;


var mongoose = require("mongoose");
var Hostel = require("./models/hostel");
var Hostel_f = require("./models/hostel_f");
var Comment   = require("./models/comment");

    var data=[    

    {

        name:"Albert Einstein Block",

        image:"https://vitspot.com/wp-content/uploads/2018/03/VIT-Mens-Hostel-A-Block-.jpg ",

        beds: [2,4],

        description:"A Block VIT offers both AC as well as non-AC rooms.",

        pros: "Nice athmosphere , Stadium right in front , Has a good shop"

    },
    {
        name:"Swami Vivekananda Block",

        image:"https://vitspot.com/wp-content/uploads/2018/03/VIT-B-Block-VIT-Mens-Hostel.jpg",

        beds: [3,6],

        description: "It is really too far and sucks"
    }
]

var data2 = [
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB(){
   //Remove all hostels
         Hostel.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed hostels!");
         //add a few hostels
        data.forEach(function(seed){
            Hostel.create(seed, function(err, hostel){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a hostel");
                    //create a comment
                    // Comment.create(
                    //     {
                    //         text: "This place is great, but I wish there was internet",
                    //         author: "Homer"
                    //     }, function(err, comment){
                    //         if(err){
                    //             console.log(err);
                    //         } else {
                    //             hostel.comments.push(comment);
                    //             hostel.save();
                    //             console.log("Created new comment");
                    //         }
                    //     });
                }
            });
        });
    });    
     Hostel_f.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed female hostels!");
         //add a few hostels
        data2.forEach(function(seed){
            Hostel_f.create(seed, function(err, hostel){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a female hostel");
                    //create a comment
                    // Comment.create(
                    //     {
                    //         text: "This place is great, but I wish there was internet",
                    //         author: "Homer"
                    //     }, function(err, comment){
                    //         if(err){
                    //             console.log(err);
                    //         } else {
                    //             hostel.comments.push(comment);
                    //             hostel.save();
                    //             console.log("Created new comment");
                    //         }
                    //     });
                }
            });
        });
    }); 
   }
  
    //add a few comments


module.exports = seedDB;

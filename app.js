var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Hostel = require("./models/hostel.js");
var Comment = require("./models/comment.js");
var Hostel_f = require("./models/hostel_f");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user.js");
var methodOverride = require('method-override');
var seedDB = require('./seeds');
var flash = require("connect-flash");

 // seedDB();


app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/hostels");
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());

app.use(express.static(__dirname + "/public"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Virat is the best batsman in the world",
  resave: false,
  saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

var commentRoutes    = require("./routes/comment"),
    hostelRoutes = require("./routes/hostel"),
    indexRoutes      = require("./routes/index")


// Hostel.create(
// {
//   name: "Subhash Chandra Bose Block(L)",
//   image: "https://vitspot.com/wp-content/uploads/2018/03/VIT-L-Block-VIT-Mens-Hostel.jpg",
//   description: "The VIT L Block (Subhas Chandra Bose Block) is one of the most preferred blocks in VIT. L Block VIT is also one of the newly constructed blocks in VIT. Being present just next to K block, it is close to the paid messes, TT, SJT. All the rooms in VIT L Block are well furnished and have good lighting facilities."
// },function(err,hostel){
//   if(err){
//     console.log(err);
//   }else{
//     console.log('Hostel Created');
//     console.log(hostel);
//   }
// });

app.use("/", indexRoutes);
app.use("/hostels", hostelRoutes);
app.use("/hostels/:id/comments", commentRoutes);


// ======================================
// Auth Routes



app.listen(8080,function(){
  console.log("the server is on its way");
});
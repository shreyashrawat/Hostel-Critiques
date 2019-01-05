var express = require("express");
var router  = express.Router({mergeParams: true});
var Hostel = require("../models/hostel");
var Hostel_f = require("../models/hostel_f");
var Comment = require("../models/comment");
var middleware = require("../middleware");


//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find campground by id
    if(res.locals.currentUser.gender == 'M')
    {
      Hostel.findById(req.params.id, function(err, hostel){
        if(err){
            console.log(err);
        } else {
             res.render("Comments/new", {hostel: hostel});
        }
      })
    }
    else{
      Hostel_f.findById(req.params.id, function(err, hostel){
        if(err){
            console.log(err);
        } else {
             res.render("Comments/new", {hostel: hostel});
        }
      })

    }
});  
    
    

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup campground using ID
   if(res.locals.currentUser.gender == 'M')
   {
      Hostel.findById(req.params.id, function(err, hostel){
       if(err){
           console.log(err);
           res.redirect("/hostels");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               console.log(req.body.rating);
               comment.save();
               hostel.comments.push(comment);
               hostel.save();
               res.redirect('/hostels/' + hostel._id);
           }
        });
       }
   });    
   }else{
      Hostel_f.findById(req.params.id, function(err, hostel){
       if(err){
           console.log(err);
           res.redirect("/hostels");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               hostel.comments.push(comment);
               hostel.save();
               res.redirect('/hostels/' + hostel._id);
           }
        });
       }
   });    

   }

   
});

// Comments edit
router.get('/:comment_id/edit',middleware.checkCommentOwnership,function(req,res){
  
  Comment.findById(req.params.comment_id, function(err,foundComment){
    if(err){
      res.redirect('back');
    }else{
      res.render('Comments/edit',{hostel_id: req.params.id, comment: foundComment})
    }
  })
})

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedHostel){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/hostels/" + req.params.id );
      }
   });
});

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted");
           res.redirect("/hostels/" + req.params.id);
       }
    });
});




module.exports = router;
var mongoose = require("mongoose");

var hostelschema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  pros: String,
  cons: String,
  beds: Array,
  author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
  comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Hostel", hostelschema);

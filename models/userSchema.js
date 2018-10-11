// grab the things we need


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  admin: Boolean,
  location: String,
  created_at: Date,
  updated_at: Date,
  shows: [String]
});

// the schema is useless so far
// we need to create a model using it



module.exports = mongoose.model("User", userSchema);
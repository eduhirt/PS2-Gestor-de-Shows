var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = new Schema({
  name: String,
  updated: { type: Date, default: Date.now },
  description: String,
  created_by: String,
  created_at: { type: Date, default: Date.now },
  time: Date,
  band: String,
  picture_url: String,
  place_address: String,
  place_CEP: String,
  place_description: String,
  crowd_limit: Number,
  bought: [String]
});

module.exports = mongoose.model("Show", showSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = new Schema({
  name: String,
  //Quando foi a última atualização
  updated: { type: Date, default: Date.now },
  description: String,
  created_by: String,
  created_at: { type: Date, default: Date.now },
  //Quando vai ser o show
  time: Date,
  band: String,
  picture_url: String,
  place_address: String,
  place_CEP: String,
  place_description: String,
  //Limite máximo de ingressos
  crowd_limit: Number,
  //Lista de e-mails de usuários que compraram ingresso do show
  bought: [String]
});

module.exports = mongoose.model("Show", showSchema);
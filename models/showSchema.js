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
  start: Date,
  //Término do show
  end: Date,
  band: String,
  //picture_url: String,
  place: String,
  address: String,
  address_number: Number,
  address_complement: String,
  address_neighborhood: String,
  address_city: String,
  address_state: String,
  address_CEP: String,
  //Limite máximo de ingressos
  crowd_limit: Number,
  //Lista de e-mails de usuários que compraram ingresso do show
  bought: [String]
});

module.exports = mongoose.model("Show", showSchema);
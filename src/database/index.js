const mongoose = require('mongoose');

mongoose.connect('mongodb://https://ps2-show-manager.herokuapp.com/eventop', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
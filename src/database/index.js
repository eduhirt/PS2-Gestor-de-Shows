const mongoose = require('mongoose');

mongoose.connect('mongodb://eduardohirt@hotmail.com:eduardo031096.@https://ps2-show-manager.herokuapp.com/eventop', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/eventop', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
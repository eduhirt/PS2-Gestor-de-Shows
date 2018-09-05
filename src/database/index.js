const mongoose = require('mongoose');

mongoose.connect('mongodb://eduardohirt@hotmail.com:eduardo031096.@https://ps2-show-manager.herokuapp.com/eventop:3000', { useNewUrlParser: true });


try{
    mongoose.Promise = global.Promise;
} catch(err){
    throw('Erro mongodb', err)
}


module.exports = mongoose;
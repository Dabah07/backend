const mongoose = require('mongoose');

module.exports = mongoose.model('product',{
    name:String,
    price : Number,
    description : String,
    image : String,
    category : String

})
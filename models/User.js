const { string } = require('joi');
const mongoose=require('mongoose');


module.exports = new mongoose.model("user",{
    username : String,  
    email : String,
    password : String,
    phone : String,
    address : String,
})

'use strict';
const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    Id: String,
    Name: String,
    Email: String,
    Password: String
   
},{
    timestamps:true
});

module.exports=mongoose.model('User',UserSchema);

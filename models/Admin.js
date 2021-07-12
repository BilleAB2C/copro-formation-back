const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator')

const adminSchema = mongoose.Schema({
  firstName : {type : String , required : true},
  lastName : {type : String , required : true},
  phone : {type : String , required : false , unique : true},
  email : {type : String , required : true , unique : true},
  password : {type : String , required : true},
  dateTime : {type : Date, required : true}
});
  adminSchema.plugin(uniqueValidator);
  module.exports = mongoose.model ('Admin', adminSchema);

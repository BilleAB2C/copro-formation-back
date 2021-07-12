const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  gender : {type : String, required : true},
  firstName : {type : String , required : true},
  lastName : {type : String , required : true},
  phone : {type : String , required : false , unique : true},
  email : {type : String , required : true , unique : true},
  password : {type : String , required : true},
  optin : {type : Boolean, required : true},
  entreprise :{type : Boolean, required : true},
  raisonSociale : {type : String , required : false },
  siret : {type : String , required : false,},
  dateTime : {type : Date, required : true}
});
  userSchema.plugin(uniqueValidator);
  module.exports = mongoose.model ('User', userSchema);

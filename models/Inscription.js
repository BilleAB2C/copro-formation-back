const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator')

const inscriptionSchema = mongoose.Schema({
  sessionId : {type : mongoose.ObjectId, required : true},
  userId : {type : mongoose.ObjectId, required : true},
  etat : { type: String, enum : ['MAINTENUE', 'ANNULEE' ,'REMBOURSEE'], default: 'MAINTENUE'},
  montantPaye : {type : Number, required : true, default: 0},
  dateInscription : {type : Date, required : true},
  dateAnnulation : {type : Date, required : false},
  tiers : [{
    gender : {type : String, required : true},
    firstName : {type : String , required : true},
    lastName : {type : String , required : true},
    phone : {type : String , required : false , unique : true},
    email : {type : String , required : false , unique : true},
    entreprise :{type : Boolean, required : true},
    raisonSociale : {type : String , required : false },
    siret : {type : String , required : false,},
  }]
});
  inscriptionSchema.plugin(uniqueValidator);
  module.exports = mongoose.model ('Inscription', inscriptionSchema);

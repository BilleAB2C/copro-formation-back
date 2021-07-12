const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator')

const sessionSchema = mongoose.Schema({
  formationId : {type : mongoose.ObjectId, required : true},
  animateur : {type : String, required : false},
  date : {type : Date, required : true},
  lieu : {type : String, required : true},
  format : {
    type: String,
    enum : ['visio', 'presentiel' ]
  },
  prix : {type : Number, required : false},
  etat : { type: String, enum : ['MAINTENUE', 'VALIDEE' , 'REPORTEE', 'ANNULEE', 'REPROGRAMMEE'], default: 'MAINTENUE'},
  nombreParticipantsMax : {type : Number, required : false},
  nombreParticipantsMin : {type : Number, required : false},
  dateTime : {type : Date, required : true}
});
  sessionSchema.plugin(uniqueValidator);
  module.exports = mongoose.model ('Session', sessionSchema);

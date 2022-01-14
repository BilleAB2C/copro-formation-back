const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator')

const formationSchema = mongoose.Schema({
  titre : {type : String, required : true, unique : true},
  sousTitre : {type : String, required : false},
  categorie : {
    type: String,
    // enum : ['juridique', 'comptable', 'controleur', 'expertise','gestion','reno' ]
    enum : ['juridique', 'gestion', 'reno', 'technique','expertise' ]
  },
  effectif : {type : String, required : true},
  descriptionDetaillee : {type : String, required : false},
  descriptionCourte : {type : String, required : false},
  programme : {
    intro : { type : String , required : false },
    parties : [{
      titre : { type : String , required : true },
      elements : [{ type : String , required : false }]
    }]
  },
  pointsForts : [{type : String , required : false}],
  prerequis : [{type : String , required : false}],
  objectifs : [{type : String, required : false}],
  publics : [{ type : String , required : false }],
  duree : { type : String , required : true },
  prix : { type : String , required : true },
  formats :[{ type : String , required : false }],
  methodePedagogique :{ type : String , required : false },
  evaluation :{ type : String , required : false },
  imageUrl : {type : String , required : false},
  pdfUrl : {type : String , required : false},
  dateTime : {type : Date, required : true}
});
  formationSchema.plugin(uniqueValidator);
  module.exports = mongoose.model ('Formation', formationSchema);

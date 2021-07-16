const Formation = require('../models/Formation');

exports.createFormation = (req, res, next) => {
  const formation = new Formation({
    titre : req.body.titre,
    sousTitre : req.body.sousTitre,
    categorie : req.body.categorie,
    descriptionDetaillee : req.body.descriptionDetaillee,
    descriptionCourte : req.body.descriptionCourte,
    programme : req.body.programme,
    pointsForts : req.body.pointsForts,
    prerequis : req.body.prerequis,
    objectifs : req.body.objectifs ,
    publics : req.body.publics ,
    duree : req.body.duree ,
    prix : req.body.prix ,
    formats :req.body.formats ,
    methodePedagogique :req.body.methodePedagogique ,
    evaluation :req.body.evaluation ,
    dateTime : new Date()
  });

  formation.save().then(
    (formation) => {
      res.status(201).json({
        _id: formation._id ,
        message: 'formation created successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error,
      });
    }
  );
};

exports.getFormation = (req, res, next) => {
  Formation.findOne({
    _id: req.params.id
  }).then(
    (formation) => {
      res.status(200).json(formation);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
}

exports.getAllFormations = (req, res, next) => {
  Formation.find().then(
      (formations) => {
        res.status(200).json(formations);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
}

exports.modifyFormation = (req, res, next) => {
  formation ={
    titre : req.body.titre,
    sousTitre : req.body.sousTitre,
    categorie : req.body.categorie,
    descriptionDetaillee : req.body.descriptionDetaillee,
    descriptionCourte : req.body.descriptionCourte,
    programme : req.body.programme,
    pointsForts : req.body.pointsForts,
    prerequis : req.body.prerequis,
    objectifs : req.body.objectifs ,
    publics : req.body.publics ,
    duree : req.body.duree ,
    prix : req.body.prix ,
    formats :req.body.formats ,
    methodePedagogique :req.body.methodePedagogique ,
    evaluation :req.body.evaluation ,
  };
  console.log(formation);
  Formation.findOneAndUpdate({_id: req.params.id}, formation).then(
    () => {
      res.status(201).json({
        message: 'Formation updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

exports.deleteFormation = (req, res, next) => {
  Formation.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
}

exports.getFormationByCategorie = (req, res, next) => {

}

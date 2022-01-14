const Formation = require('../models/Formation');
const path = require('path');
const fs = require ('fs');

exports.createFormation = (req, res, next) => {
  const formation = new Formation({
    titre : req.body.titre,
    sousTitre : req.body.sousTitre,
    categorie : req.body.categorie,
    effectif : req.body.effectif,
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

exports.getFormationImage = (req, res, next) => {
    const imageName = req.params.id;
    const imagePath = path.join(__dirname, "../images", imageName);

    fs.exists(imagePath, exists => {
        if (exists) {
            const { size } = fs.statSync(imagePath);
            fs.createReadStream(imagePath).pipe(res);
        }
        else res.status(400).send('Error: Image does not exists');
    });
}

exports.getFormationPDF = (req, res, next) => {
    const pdfName = req.params.id;
    const pdfPath = path.join(__dirname, "../PDFs", pdfName);

    fs.exists(pdfPath, exists => {
        if (exists) {
            const { size } = fs.statSync(pdfPath);
            fs.createReadStream(pdfPath).pipe(res);
        }
        else res.status(400).send('Error: PDF does not exists');
    });
}

exports.getFormationsForHome = (req, res, next) => {
  Formation.find({
    $or : [
      {_id: "60f0547122ecfa006860e840"},
      {_id: "60e57762bb1ffe4facc21a7e"},
      {_id: "60edb30112dd4e00276848e8"},
      {_id: "6139de6810cd030092090098"},
      {_id: "6139c0d010cd030092090088"}
    ]
  }).then(
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
    effectif : req.body.effectif,
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
    evaluation :req.body.evaluation
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

exports.modifyImageFormation = (req, res, next) => {
  console.log("kkkkk");
  Formation.updateOne(
    {_id: req.params.id},
    {
      $set :
      {
        imageUrl : req.body.imageUrl
      }
    }
  ).then(
    () => {
      res.status(201).json({
        message: 'Formation image updated successfully!'
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

exports.modifyPDFFormation = (req, res, next) => {
  Formation.updateOne(
    {_id: req.params.id},
    {
      $set :
      {
        pdfUrl : req.body.pdfUrl
      }
    }
  ).then(
    () => {
      res.status(201).json({
        message: 'Formation PDF updated successfully!'
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

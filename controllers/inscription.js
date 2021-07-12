const Inscription = require('../models/Inscription');

exports.getInscription= (req, res, next) => {
  Inscription.findOne({
      _id: req.params.id
    }).then(
      (inscription) => {
        res.status(200).json(inscription);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
}
exports.getAllInscriptions= (req, res, next) => {
  Inscription.find().then(
      (inscriptions) => {
        res.status(200).json(inscriptions);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
}
exports.createInscription= (req, res, next) => {

}
exports.modifyInscription= (req, res, next) => {

}
exports.cancelInscription= (req, res, next) => {

}
exports.deleteInscription= (req, res, next) => {
  Inscription.deleteOne({_id: req.params.id}).then(
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
exports.getInscriptionsByUser= (req, res, next) => {

}
exports.getInscriptionsBySession= (req, res, next) => {

}
exports.getInscriptionsByFormation= (req, res, next) => {

}
exports.getInscriptionsByCategorie= (req, res, next) => {

}

const Session = require('../models/Session');

exports.getSession= (req, res, next) => {
  Session.findOne({
      _id: req.params.id
    }).then(
      (session) => {
        res.status(200).json(session);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
}
exports.getAllSessions= (req, res, next) => {
  Session.find().then(
      (sessions) => {
        res.status(200).json(sessions);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
}
exports.createSession= (req, res, next) => {

}
exports.modifySession= (req, res, next) => {

}
exports.deleteSession= (req, res, next) => {
  Session.deleteOne({_id: req.params.id}).then(
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
exports.getSessionsByCategorie= (req, res, next) => {

}
exports.getSessionsByFormation= (req, res, next) => {

}
exports.getSessionsByDate= (req, res, next) => {

}

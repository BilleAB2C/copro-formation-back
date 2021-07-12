const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/User');

exports.getUser = (req, res, next) => {
  User.findOne({
      _id: req.params.id
    }).then(
      (user) => {
        res.status(200).json(user);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
}

exports.getAllUsers = (req, res, next) => {
  User.find().then(
      (users) => {
        res.status(200).json(users);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
}

exports.createUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(401).json({ error: 'email exist déjà !' });
      }else {
        User.findOne({phone : req.body.phone})
        .then (user => {
          if (user) {
            return res.status(401).json({ error: 'téléphone exist déjà !' });
          }else {
            bcrypt.hash(req.body.password, 3)
            .then(hash => {
              const user = new User({
                gender : req.body.gender ,
                firstName : req.body.firstName ,
                lastName : req.body.lastName,
                email : req.body.email,
                phone : req.body.phone,
                password : hash,
                optin:req.body.optin,
                entreprise : req.body.entreprise,
                raisonSociale : req.body.raisonSociale,
                siret : req.body.siret,
                dateTime : new Date()
              });
              user.save().then(
                (user) => {
                  res.status(201).json({
                    message: 'User saved successfully!',
                    userId: user._id
                  });
                }
              ).catch(
                (error) => {
                  res.json({
                    error: error
                  });
                }
              );
            })
            .catch(
              error=>{
                res.json({error})
              }
            )
          }
          })
          .catch(error => res.status(500).json({ error }));
        }
      })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = {
      gender : req.body.gendre ,
      firstName : req.body.firstName ,
      lastName : req.body.lastName,
      email : req.body.email,
      phone : req.body.phone,
      password : hash,
      optin:req.body.optin,
      entreprise : req.body.entreprise,
      raisonSociale : req.body.raisonSociale,
      siret : req.body.siret,
    };
    User.findOneAndUpdate({_id: req.params.id}, user).then(
      () => {
        res.status(201).json({
          message: 'User updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  })
  .catch(
    error=>{
      res.json({error})
    }
  )
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Identifiant incorrect !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              {
                userId: user._id ,
                role: 'user'
              },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({_id: req.params.id}).then(
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

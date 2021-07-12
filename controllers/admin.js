const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const mongoose = require('mongoose');

const Admin = require('../models/Admin');

exports.createAdmin = (req, res, next) => {
  bcrypt.hash(req.body.password, 3)
  .then(hash => {
    const admin = new Admin({
      firstName : req.body.firstName ,
      lastName : req.body.lastName,
      email : req.body.email,
      phone : req.body.phone,
      password : hash,
      dateTime : new Date()
    });
    admin.save().then(
      (admin) => {
        res.status(201).json({
          message: 'Admin saved successfully!',
          adminId: admin._id
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
};

exports.modifyAdmin = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const admin = {
      firstName : req.body.firstName ,
      lastName : req.body.lastName,
      email : req.body.email,
      phone : req.body.phone,
      password : hash,
    };
    Admin.findOneAndUpdate({_id: req.params.id}, admin).then(
      () => {
        res.status(201).json({
          message: 'Admin updated successfully!'
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
  Admin.findOne({ email: req.body.email })
    .then(admin => {
      if (!admin) {
        return res.status(401).json({ error: 'Identifiant incorrect !' });
      }
      bcrypt.compare(req.body.password, admin.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            adminId: admin._id,
            token: jwt.sign(
              {
                adminId: admin._id ,
                role: 'admin'
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

exports.getAdmin = (req, res, next) => {
  Admin.findOne({
      _id: req.params.id
    }).then(
      (admin) => {
        res.status(200).json(admin);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
};

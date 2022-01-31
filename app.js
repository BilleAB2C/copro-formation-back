const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ENV.User:ENV.password@clustercoproformation.wwiqj.mongodb.net/coproFormationDB?retryWrites=true&w=majority";

const multer = require('multer');
var fileExtension = require('file-extension')
const path = require('path');

const formationRoutes = require ('./routes/formation');
const userRoutes = require ('./routes/user');
const adminRoutes = require ('./routes/admin');
const sessionRoutes = require ('./routes/session');
const inscriptionRoutes = require ('./routes/inscription');
const sendMailRoutes = require ('./routes/sendMail');

const https = require ('https')

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify :false })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cors());

app.use(bodyParser.json());

var storage = multer.diskStorage({

    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        cb(null, 'images')
    },

    // Setting name of file saved
    filename: function (req, file, cb) {
      cb(null, req.params._id + '.' + fileExtension(file.originalname) );
      // cb(null, Date.now() + '-' + file.originalname.split(' ').join('_') )
        // cb(null, file.originalname.split(' ').join('_') + '-' + Date.now() + '.' + fileExtension(file.originalname))
    }
})

var storagePDF = multer.diskStorage({

    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        cb(null, 'PDFs')
    },

    // Setting name of file saved
    filename: function (req, file, cb) {
      cb(null, req.params._id + '.' + fileExtension(file.originalname) );
      // cb(null, Date.now() + '-' + file.originalname.split(' ').join('_') )
        // cb(null, file.originalname.split(' ').join('_') + '-' + Date.now() + '.' + fileExtension(file.originalname))
    }
})

var upload = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 2MBs
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            //Error
            cb(new Error('Format incorrect'))
        }
        //Success
        else{
          cb(undefined, true)
        }
    }
})

var uploadPDF = multer({
    storage: storagePDF,
    limits: {
        // Setting Image Size Limit to 2MBs
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(pdf|jpeg|png)$/)) {
            //Error
            cb(new Error('Format incorrect'))
        }
        //Success
        else{
          cb(undefined, true)
        }
    }
})

app.post('/uploadfile/:_id', upload.single('uploadedImage'), (req, res, next) => {
    const file = req.file;

    if (!file) {
        const error = new Error('Please upload an image')
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})

app.post('/uploadfilePDF/:_id', uploadPDF.single('uploadedPdf'), (req, res, next) => {
    const file = req.file;

    if (!file) {
        const error = new Error('Please upload a PDF')
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})

app.use('/coproformation/formation' , formationRoutes);
app.use('/coproformation/user' , userRoutes);
app.use('/coproformation/admin' , adminRoutes);
app.use('/coproformation/session' , sessionRoutes);
app.use('/coproformation/inscription' , inscriptionRoutes);
app.use('/coproformation/contact' , sendMailRoutes);

module.exports = app;
